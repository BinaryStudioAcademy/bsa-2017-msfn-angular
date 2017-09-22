import {Component, Input, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {FullTribePostComponent} from '../full-tribe-post/full-tribe-post.component';
import {WindowObj} from '../../../../services/window.service';
import {TribeService} from '../tribe.service';
import {ToasterService} from '../../../../services/toastr.service';

@Component({
    selector: 'app-tribe-post',
    templateUrl: './tribe-post.component.html',
    styleUrls: ['./tribe-post.component.scss'],
    providers: [TribeService]
})
export class TribePostComponent implements OnInit {
    @Input() canAddComment;
    @Input() tribe;
    @Input() post;


    hideComments: boolean;
    userPhoto: string;
    userFirstName: string;
    userID: string;
    commentText: string;

    constructor( private mdDialog: MdDialog,
                 private tribeService: TribeService,
                 private toasterService: ToasterService,
                 private window: WindowObj) {
        this.userPhoto = (this.window.data._injectedData as any).userPhoto;
        this.userFirstName = (this.window.data._injectedData as any).userFirstName;
        this.userID = (this.window.data._injectedData as any).userId;
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
        if (!this.commentText) {
            this.toasterService.showMessage('warning', 'Cannot add empty comment');
            return;
        }
        this.tribeService.commentPost(
            this.tribe,
            this.post._id,
            this.userID,
            this.commentText,
            (resp) => {
                if (resp.requested) {
                    this.toasterService.showMessage('success', 'Comment saved');
                } else {
                    this.toasterService.showMessage('error', 'Failed to add comment');
                }
            }
        );
    }

    toggleComments() {
        this.hideComments = !this.hideComments;
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
