import { Component, OnInit } from '@angular/core';
import { FollowingListService } from './following-list.service';
import ISubscribeUser = SubscribeApi.ISubscribeUser;

@Component({
    selector: 'app-following-list',
    providers: [FollowingListService],
    templateUrl: './following-list.component.html',
    styleUrls: ['./following-list.component.scss']
})
export class FollowingListComponent implements OnInit {
    allFollowing: ISubscribeUser[];
    filterFollowing: ISubscribeUser[];
    showFollowing: ISubscribeUser[];
    addCount = 20;
    noFollowing = false;

    constructor(private followingListService: FollowingListService) {
    }

    ngOnInit() {
        this.followingListService.getFollowing(data => {
            this.allFollowing = data;
            this.filterFollowing = data;
            this.showFollowing = data.slice(0, this.addCount);
            if (data.length === 0) {
                this.noFollowing = true;
            }
        });
    }

    onScroll() {
        if (this.showFollowing.length < this.filterFollowing.length) {
            this.showFollowing.push(...this.filterFollowing.slice(this.showFollowing.length, this.showFollowing.length + this.addCount));
        }
    }

    onSearch(value: string) {
        this.filterFollowing = this.allFollowing.filter(follower =>
            follower.lastName.toLowerCase().includes(value.toLowerCase()) ||
            follower.firstName.toLowerCase().includes(value.toLowerCase()));
        this.showFollowing = this.filterFollowing.slice(0, this.addCount);
    }

    unfollow(unfollowBtn: HTMLButtonElement, id: string) {
        if (unfollowBtn.innerText === 'Unfollow') {
            this.followingListService.unfollow(id);
            unfollowBtn.innerText = 'Follow';
        } else {
            this.followingListService.follow(id);
            unfollowBtn.innerText = 'Unfollow';
        }
    }
}
