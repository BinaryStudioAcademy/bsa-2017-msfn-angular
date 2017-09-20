import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdDialog} from '@angular/material';
import {FullTribePostComponent} from '../full-tribe-post/full-tribe-post.component';
import {WindowObj} from '../../../../services/window.service';
import {TribeService} from '../tribe.service';

@Component({
    selector: 'app-tribe-post',
    templateUrl: './tribe-post.component.html',
    styleUrls: ['./tribe-post.component.scss'],
    providers: [TribeService]
})
export class TribePostComponent implements OnInit {
    @Output() onAddFavourite = new EventEmitter();
    @Output() onAddComment = new EventEmitter();
    @Input() post;


    hideComments: boolean;
    userPhoto: string;
    userFirstName: string;

    constructor( private mdDialog: MdDialog,
                 private tribeService: TribeService,
                 private window: WindowObj) {
        this.userPhoto = (this.window.data._injectedData as any).userPhoto;
        this.userFirstName = (this.window.data._injectedData as any).userFirstName;
    }

    ngOnInit() {
        this.hideComments = true;
        console.log(this.post.comments);
        if (this.post.comments) {
            for (let item of this.post.comments) {
                this.tribeService.getUserById(item.author, (res) => {
                    item = Object.assign(item, {userPhoto: res.userPhoto, firstName: res.firstName});
                });
            }
            console.log(this.post.comments);
        }
        this.tribeService.getUserById(this.post.author, (res) => {
            this.post.author = Object.assign(
                this.post.author,
                {
                    userPhoto: res.userPhoto,
                    firstName: res.firstName,
                    lastName: res.lastName
                }
            );
        });
    }

    addComment() {
        this.onAddComment.emit();
    }

    toggleComments() {
        this.hideComments = !this.hideComments;
    }

    addFavourite() {
        this.onAddFavourite.emit();
    }

    viewFull() {
        this.mdDialog.open(FullTribePostComponent, {
            data: {
                title : this.post.title,
                author: {
                    firstName: this.post.firstName,
                    lastName: this.post.lastName,
                },
                text: this.post.text,
                image: this.post.image,
                createdAt: this.post.createdAt
            }
        });
    }
}
