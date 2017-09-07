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
        name: 'Brick',
        location: 'Pandora, The Vault',
        followers: '1M',
        photo: '../../resources/default.png',
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
        about: 'Phasellus dignissim condimentum metus vel egestas.' +
            'Quisque quis dui iaculis, pulvinar leo eget, mollis metus.' +
            'Suspendisse fermentum tempor purus, ac lacinia nunc facilisis ac.' +
            'Morbi augue neque, aliquam et fermentum eget, sodales id mauris. Proin viverra.',
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
        this.userListService.getFollowers(data => {
            this.followers = data;
            console.log(this.followers);
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
            this.userListService.getFollowing(data => {
                this.followers = data;
            });
        });
    }

    unfollowUser(): void {
        this.userListService.unfollow(this.userData._id, () => {
            this.isFollowed = false;
            this.userListService.getFollowing(data => {
                this.followers = data;
            });
        });
    }
}
