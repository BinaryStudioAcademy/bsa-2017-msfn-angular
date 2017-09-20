import { Component, OnInit } from '@angular/core';
import { ITribe } from '../../../../models/tribe';
import { MdDialog } from '@angular/material';
import { TribeMembersDialogComponent } from '../tribe-members-dialog/tribe-members-dialog.component';
import { ITribePost } from '../../../../models/tribe-post';
import { TribeService } from '../tribe.service';
import { ActivatedRoute } from '@angular/router';
import { WindowObj } from '../../../../services/window.service';
import { ToasterService } from '../../../../services/toastr.service';

@Component({
    selector: 'app-tribe-page',
    templateUrl: './tribe-page.component.html',
    styleUrls: ['./tribe-page.component.scss'],
    providers: [TribeService]
})
export class TribePageComponent implements OnInit {
    posts: ITribePost[];
    trueTribe: ITribe = {
        name: '',
        creator: '',
        members: [],
        description: '',
        image: ''
    };
    userId: string;

    constructor(private mdDialog: MdDialog,
                private tribeService: TribeService,
                public activatedRoute: ActivatedRoute,
                private toasterService: ToasterService,
                private window: WindowObj) {
        this.userId = (this.window.data._injectedData as any).userId;
    }

    ngOnInit() {
        console.log(this.trueTribe);
        const tribeID = this.activatedRoute.snapshot.params.id;
        if (tribeID) {
            this.tribeService.getTribe(tribeID, (resp) => {
                this.trueTribe = resp;
                console.log(this.trueTribe);
            });
            this.tribeService.getPostsByTribe(tribeID, (res) => {
                this.posts = res;
                console.log(this.posts);
            });
        }
    }

    showFollowers() {
        this.mdDialog.open(TribeMembersDialogComponent, {
            data: this.trueTribe.members
        });
    }

    saveComment(postId, text) {
        this.tribeService.commentPost(
            this.trueTribe._id,
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
}
