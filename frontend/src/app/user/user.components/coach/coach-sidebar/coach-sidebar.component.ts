import { Component, Input, OnInit } from '@angular/core';
import { UserListService } from '../../user-list/user-list.service';
import { WindowObj } from '../../../../services/window.service';

@Component({
    selector: 'app-coach-sidebar',
    templateUrl: './coach-sidebar.component.html',
    styleUrls: [
        './coach-sidebar.component.scss',
        '../coach.component.scss'
    ],
    providers: [UserListService]
})
export class CoachSidebarComponent implements OnInit {

    constructor(private window: WindowObj,
                private userListService: UserListService) {
    }

    @Input() userData;

    private _id = this.window.data._injectedData.userId;
    followers = [];
    isFollowed: boolean = false;

    coachInfo = {
        socialLinks: [
            {
                name: 'Facebook',
                link: '',
                color: '#5081e8'
            },
            {
                name: 'Twitter',
                link: '',
                color: '#36b9ff'
            },
            {
                name: 'Instagram',
                link: '',
                color: '#d520cd'
            },
            {
                name: 'Youtube',
                link: '',
                color: '#f12727'
            }
        ],
        testimonials: [
            {
                name: 'Ellie',
                text: 'Phasellus nec metus a orci ullamcorper viverra. Duis lacinia luctus tellus elementum posuere.',
                photo: '../../resources/default.png'
            },
            {
                name: 'Handsome Jack',
                text: 'Morbi augue neque, aliquam et fermentum eget, sodales id mauris. Mauris semper arcu ac maximus mattis.',
                photo: '../../resources/default.png'
            }
        ]
    };

    ngOnInit() {
        this.userListService.getFollowers(this.userData._id, data => {
            this.followers = data;
            this.isFollowed = this.followers.find(item => {
                return item.id === this._id;
            });
        });
    }

    followAction() {
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
                this.followers = data;
            });
        });
    }

    unfollowUser(): void {
        this.userListService.unfollow(this.userData._id, () => {
            this.isFollowed = false;
            this.userListService.getFollowers(this.userData._id, data => {
                this.followers = data;
            });
        });
    }
}
