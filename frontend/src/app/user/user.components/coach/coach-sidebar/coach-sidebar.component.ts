import { Component, Input, OnInit } from '@angular/core';
import { UserListService } from '../../user-list/user-list.service';
import { WindowObj } from '../../../../services/window.service';
import { MessagePostingService } from '../../message-posting/message-posting.service';
import { CoachService } from '../coach.service';

@Component({
    selector: 'app-coach-sidebar',
    templateUrl: './coach-sidebar.component.html',
    styleUrls: [
        './coach-sidebar.component.scss',
        '../coach.component.scss'
    ],
    providers: [
        UserListService,
        MessagePostingService
    ]
})
export class CoachSidebarComponent implements OnInit {

    constructor(private window: WindowObj,
                private userListService: UserListService,
                private messagePostingService: MessagePostingService,
                private coachService: CoachService) {
    }

    private _id = this.window.data._injectedData.userId;
    @Input() userData;

    coachData = {
        followers: [],
        socialLinks: [],
        testimonials: [],
    };

    isFollowed: boolean = false;
    posting: boolean = false;

    ngOnInit() {
        this.getTestimonialData();
        this.coachData.socialLinks = this.coachService.getSocialLinks(this.userData);

        this.userListService.getFollowers(this.userData._id, data => {
            this.coachData.followers = data;
            this.isFollowed = this.coachData.followers.find(item => {
                return item.id === this._id;
            });
        });
    }

    followAction(): void {
        if (this.isFollowed) {
            this.unfollowUser();
        } else {
            this.followUser();
        }
    }

    followUser(): void {
        this.userListService.follow(this.userData._id, () => {
            this.isFollowed = true;
            this.userListService.getFollowers(this.userData._id, data => {
                this.coachData.followers = data;
            });
        });
    }

    unfollowUser(): void {
        this.userListService.unfollow(this.userData._id, () => {
            this.isFollowed = false;
            this.userListService.getFollowers(this.userData._id, data => {
                this.coachData.followers = data;
            });
        });
    }

    getTestimonialData(): void {
        this.messagePostingService.getMessages(this.userData._id, data => {
            this.coachData.testimonials = this.coachService.getRandomTestimonials(data);
        }, true);
    }

    addFeedback(): void {
        this.posting = true;
    }

    closeFeedback(): void {
        this.posting = false;
    }

    updateTestimonialData(): void {
        this.coachData.testimonials = [];
        this.getTestimonialData();
    }
}
