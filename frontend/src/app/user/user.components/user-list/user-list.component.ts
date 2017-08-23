import { Component, OnInit} from '@angular/core';
import { UserListService } from './user-list.service';
import ISubscribeUser = SubscribeApi.ISubscribeUser;
import {FollowingListService} from '../following-list/following-list.service';
import {FollowersListService} from '../followers-list/followers-list.service';

@Component ({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [
        UserListService,
        FollowersListService,
        FollowingListService
    ],
})
export class UserListComponent implements OnInit {
    users: {
        all: ISubscribeUser[],
        filtered: ISubscribeUser[],
        show: ISubscribeUser[],
        filter: '',
        hidden: false
    };
    followers: {
        all: ISubscribeUser[],
        filtered: ISubscribeUser[],
        show: ISubscribeUser[],
        filter: '',
        hidden: true,
        empty: true
    };
    following: {
        all: ISubscribeUser[],
        filtered: ISubscribeUser[],
        show: ISubscribeUser[],
        filter: '',
        hidden: true,
        empty: true
    };
    userPerPage = 20;

    constructor(private userListService: UserListService,
                private followingListService: FollowingListService,
                private followersListService: FollowersListService
                ) {
        this.users = {
            all: [],
            filtered: [],
            show: [],
            filter: '',
            hidden: false
        };
        this.followers = {
            all: [],
            filtered: [],
            show: [],
            filter: '',
            hidden: true,
            empty: true
        };
        this.following = {
            all: [],
            filtered: [],
            show: [],
            filter: '',
            hidden: true,
            empty: true
        };
    }

    ngOnInit() {
        this.userListService.getAllUsers(data => {
            for (const user of data) {
                if (user.role !== 'admin') {
                    this.users.all.push(user);
                    this.users.filtered.push(user);
                    if (this.users.show.length < this.userPerPage) {
                        this.users.show.push(user);
                    }
                }
            }
            console.log(this.users.show);
        });
        this.followersListService.getFollowers(data => {
            if (data.length === 0) {
                this.followers.empty = true;
            }
            this.followers.all = data;
            this.followers.filtered = data;
            this.followers.show = data.slice(0, this.userPerPage);
            console.log(this.followers.show);
        });
        this.followingListService.getFollowing(data => {
            if (data.length === 0) {
                this.following.empty = true;
            }
            this.following.all = data;
            this.following.filtered = data;
            this.following.show = data.slice(0, this.userPerPage);
            console.log(this.following.show);
        });
    }

    onSearch(type: string, value: string) {
        this[type].filtered = this[type].all.filter(user =>
            user.lastName.toLowerCase().includes(value.toLowerCase()) ||
            user.firstName.toLowerCase().includes(value.toLowerCase()));
        this[type].show = this[type].filtered.slice(0, this.userPerPage);
    }

    onScroll(type: string) {
        if (this[type].show.length < this[type].filtered.length) {
            this[type].show.push(...this[type].filtered.slice(
                this[type].show.length,
                this[type].show.length + this.userPerPage));
        }
    }

    toggleExpand(type: string) {
        this[type].hidden = !this[type].hidden;
    }
}
