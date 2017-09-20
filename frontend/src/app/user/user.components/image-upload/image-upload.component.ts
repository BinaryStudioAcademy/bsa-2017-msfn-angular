import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

    constructor(private dialogRef: MdDialogRef<ImageUploadComponent>,
                @Inject(MD_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

    }

    chooseFile() {
        this.dialogRef.close();
        this.data.event.target.click();
    }

    uploadFile(url) {
        this.dialogRef.close(url);
    }
}
