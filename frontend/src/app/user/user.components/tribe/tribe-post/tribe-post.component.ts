import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdDialog} from '@angular/material';
import {FullTribePostComponent} from '../full-tribe-post/full-tribe-post.component';
import {TribeService} from '../tribe.service';

@Component({
    selector: 'app-tribe-post',
    templateUrl: './tribe-post.component.html',
    styleUrls: ['./tribe-post.component.scss'],
    providers: [TribeService],
})
export class TribePostComponent implements OnInit {

    @Input() title: string;
    @Input() text: string;
    @Input() image: string;
    @Input() author: string;
    @Input() comments: Array<{author: string, text: string}>;
    @Input() createdAt: Date;
    @Output() onAddFavourite = new EventEmitter();
    @Output() onAddComment = new EventEmitter();

    hideComments: boolean;
    fullComments: Array<{userPhoto: string, firstName: string, text: string}>;
    firstView: boolean;
    constructor( private mdDialog: MdDialog,
                 private tribeService: TribeService) { }

    ngOnInit() {
        this.hideComments = true;
        this.firstView = true;
        this.title = 'Post title';
        this.author = 'Super Tribe';
        this.text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,' +
          '        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae' +
          '        dicta sunt explicabosed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ' +
            '       Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed' +
            ' quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ' +
            'ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea ' +
            'commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil ' +
            'molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
        this.image = 'https://www.wishacupcake.com/wp-content/uploads/2016/12/chocolate-truffle-cake-dark' +
            '-chocolate-cake-chocolate-sponge-cake.jpg';

    }

    addComment() {
        this.onAddComment.emit();
    }

    toggleComments() {
        this.hideComments = !this.hideComments;
        if (this.firstView) {
            /*this.fullComments = this.comments.map( (item) => {
                this.tribeService.getUserById(item.author, (res) => {

                });
            });*/
        }
        this.firstView = false;
    }
    addFavourite() {
        this.onAddFavourite.emit();
    }

    viewFull() {
        this.mdDialog.open(FullTribePostComponent, {
            data: {
                title : this.title,
                author: this.author,
                text: this.text,
                image: this.image,
                createdAt: this.createdAt
            }
        });
    }
}
