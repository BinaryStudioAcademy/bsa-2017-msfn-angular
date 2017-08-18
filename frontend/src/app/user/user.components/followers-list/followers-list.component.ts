import { Component, OnInit } from '@angular/core';
import { FollowersListService } from './followers-list.service';
import ISubscribeUser = SubscribeApi.ISubscribeUser;

@Component({
    selector: 'app-followers-list',
    providers: [FollowersListService],
    templateUrl: './followers-list.component.html',
    styleUrls: ['./followers-list.component.scss']
})
export class FollowersListComponent implements OnInit {
    allFollowers: ISubscribeUser[];
    filterFollowers: ISubscribeUser[];
    showFollowers: ISubscribeUser[];
    addCount = 20;
    noFollowers = false;

    constructor(private followersListService: FollowersListService) {
    }

    ngOnInit() {
        this.followersListService.getFollowers(data => {
            this.allFollowers = data;
            this.filterFollowers = data;
            this.showFollowers = data.slice(0, this.addCount);
            if (data.length === 0) {
                this.noFollowers = true;
            }
        });
    }

    onScroll() {
        if (this.showFollowers.length < this.filterFollowers.length) {
            this.showFollowers.push(...this.filterFollowers.slice(this.showFollowers.length, this.showFollowers.length + this.addCount));
        }
    }

    onSearch(value: string) {
        this.filterFollowers = this.allFollowers.filter(follower =>
            follower.lastName.toLowerCase().includes(value.toLowerCase()) ||
            follower.firstName.toLowerCase().includes(value.toLowerCase()));
        this.showFollowers = this.filterFollowers.slice(0, this.addCount);
    }
}
