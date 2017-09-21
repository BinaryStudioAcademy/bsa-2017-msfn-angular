import { Component, OnInit } from '@angular/core';
import { ITribe } from '../../../../models/tribe';
import { MdDialog } from '@angular/material';
import { TribeMembersDialogComponent } from '../tribe-members-dialog/tribe-members-dialog.component';
import { ITribePost } from '../../../../models/tribe-post';
import { TribeService } from '../tribe.service';
import { ActivatedRoute } from '@angular/router';
import { WindowObj } from '../../../../services/window.service';
import { ToasterService } from '../../../../services/toastr.service';
import { CreateTribePostComponent } from '../create-tribe-post/create-tribe-post.component';

@Component({
    selector: 'app-tribe-page',
    templateUrl: './tribe-page.component.html',
    styleUrls: ['./tribe-page.component.scss'],
    providers: [TribeService]
})
export class TribePageComponent implements OnInit {
    posts: ITribePost[];
    tribe: ITribe = {
        name: '',
        creator: '',
        members: [],
        description: '',
        image: ''
    };
    userId: string;
    tribeID: string;
    settingsLink: string;

    constructor(private mdDialog: MdDialog,
                private tribeService: TribeService,
                public activatedRoute: ActivatedRoute,
                private toasterService: ToasterService,
                private window: WindowObj) {
        this.userId = (this.window.data._injectedData as any).userId;
        this.tribeID = this.activatedRoute.snapshot.params.id;
        this.settingsLink = '/user/tribe-settings/' + this.tribeID + '/general';
    }

    ngOnInit() {
        console.log(this.tribe);
        if (this.tribeID) {
            this.tribeService.getTribe(this.tribeID, (resp) => {
                this.tribe = resp;
                console.log(this.tribe);
            });
            this.tribeService.getPostsByTribe(this.tribeID, (res) => {
                this.posts = res;
                console.log(this.posts);
            });
        }
    }

    showFollowers() {
        this.mdDialog.open(TribeMembersDialogComponent, {
            data: this.tribe.members
        });
    }

    addPost() {
        this.mdDialog.open(CreateTribePostComponent, {
            data: {
                tribeId: this.tribeID,
                userId: this.userId
            }
        });
    }

    saveComment(postId, text) {
        this.tribeService.commentPost(
            this.tribe._id,
            postId,
            this.userId,
            text,
            (resp) => {
                if (resp.requested) {
                    this.toasterService.showMessage('success', 'Comment saved' );
                } else {
                    this.toasterService.showMessage('error', 'Failed to add comment');
                }
            }
        );
    }

    addComment() {}

    addFavourite() {}

    follow() {
        if (!this.tribe.members.includes(this.userId)) {
            this.tribeService.addFollower(this.tribeID, this.userId, () => {});
        } else {
            this.toasterService.showMessage( 'error', 'You already follow this tribe');
        }
    }
}
