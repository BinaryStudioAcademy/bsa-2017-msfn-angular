import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-full-tribe-post',
  templateUrl: './full-tribe-post.component.html',
  styleUrls: ['./full-tribe-post.component.scss']
})
export class FullTribePostComponent implements OnInit {
    public post;

    constructor(@Inject(MD_DIALOG_DATA) public data) { }

    ngOnInit() {
        this.post = this.data;
    }
}
