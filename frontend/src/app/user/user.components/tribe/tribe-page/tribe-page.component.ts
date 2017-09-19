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
    tribe: ITribe = {
    name: 'Super Tribe',
    description: '**Description** Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
    '            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n' +
    '            quis nostrud exercitation ullamco laboris nisi ut aliquip',
    members: ['59b8c7ab52d7d41022a59e72', '59b8c7ab52d7d41022a59e77'],
    };
    posts = [1, 2, 3];
    truePosts: ITribePost[];
    trueTribe: ITribe;
    userId: string;

    constructor(private mdDialog: MdDialog,
                private tribeService: TribeService,
                public activatedRoute: ActivatedRoute,
                private toasterService: ToasterService,
                private window: WindowObj) {
    this.userId = (this.window.data._injectedData as any).userId;
    }

    ngOnInit() {
        const tribeID = this.activatedRoute.snapshot.params.id;
        if (tribeID && !this.trueTribe) {
            this.tribeService.getTribe(tribeID, (resp) => {
                if (resp) {
                    this.trueTribe = resp[0];
                    this.tribeService.getPostsByTribe(tribeID, (res) => {
                        this.truePosts = res;
                    });
                }
            });
        }
    }

    showFollowers() {
        this.mdDialog.open(TribeMembersDialogComponent, {
            data: this.tribe.members
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

}
