import {Component, OnInit} from '@angular/core';
import {UserListService} from './user-list.service';
import ISubscribeUser = SubscribeApi.ISubscribeUser;
import {WindowObj} from '../../../services/window.service';
import {ChatService} from '../../../services/chat.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [
        UserListService
    ],
})
export class UserListComponent implements OnInit {
    users: {
        all: ISubscribeUser[],
        filtered: ISubscribeUser[],
        show: ISubscribeUser[],
        filter: '',
    };
    followers: {
        all: ISubscribeUser[],
        filtered: ISubscribeUser[],
        show: ISubscribeUser[],
        filter: '',
    };
    following: {
        all: ISubscribeUser[],
        filtered: ISubscribeUser[],
        show: ISubscribeUser[],
        filter: '',
    };
    userPerPage = 20;

    constructor(private userListService: UserListService,
                private window: WindowObj,
                private chatService: ChatService) {
        this.users = {
            all: [],
            filtered: [],
            show: [],
            filter: ''
        };
        this.followers = {
            all: [],
            filtered: [],
            show: [],
            filter: ''
        };
        this.following = {
            all: [],
            filtered: [],
            show: [],
            filter: ''
        };
    }

    ngOnInit() {
        const currentUser = {
            id: (this.window.data._injectedData as any).userId,
            follow: []
        };
        this.userListService.getAllUsers(data => {
            currentUser.follow = data[data.findIndex(item => item._id === currentUser.id)].follow;
            for (const user of data) {
                if (!(user.role === 'admin' || user._id === currentUser.id)) {
                    user.isFollowed = currentUser.follow.includes(user._id);
                    this.users.all.push(user);
                    this.users.filtered.push(user);
                    if (this.users.show.length < this.userPerPage) {
                        this.users.show.push(user);
                    }
                }
            }
        });
        this.userListService.getFollowers(currentUser.id, data => {
            data.forEach(element => {
                element.isFollowed = currentUser.follow.includes(element._id);
            });
            this.followers.all = data;
            this.followers.filtered = data;
            this.followers.show = data.slice(0, this.userPerPage);
        });
        this.userListService.getFollowing(currentUser.id, data => {
            data.forEach(element => {
                element.isFollowed = currentUser.follow.includes(element._id);
            });
            this.following.all = data;
            this.following.filtered = data;
            this.following.show = data.slice(0, this.userPerPage);
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

    unfollow(user: ISubscribeUser) {
        this.userListService.unfollow(user._id, (err, data) => {
            user.isFollowed = false;
        });
    }

    follow(user: ISubscribeUser) {
        user.isFollowed = true;
        this.userListService.follow(user._id, (err, data) => {
            user.isFollowed = true;
            const userInList = this.following.all.some((el, ind) => {
                if (el._id === user._id) {
                    return false;
                }
                return true;
            });
            if (!userInList) {
                this.following.all.push(user);
                this.following.show = this.following.all.slice(0, this.userPerPage);
            }
        });
    }

    initChat(user) {
        this.chatService.startChat(user._id);
    }

}
