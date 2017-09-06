import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-coach-sidebar',
    templateUrl: './coach-sidebar.component.html',
    styleUrls: [
        './coach-sidebar.component.scss',
        '../coach.component.scss'
    ]
})
export class CoachSidebarComponent implements OnInit {

    constructor() {
    }

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
    }

}
