import { MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-select-users-dialog',
    templateUrl: './select-users-dialog.component.html',
    styleUrls: ['./select-users-dialog.component.scss']
})
export class SelectUsersDialogComponent implements OnInit {
    members: any;
    checked: any;
    result = [];
    constructor(
        @Inject(MD_DIALOG_DATA) public data: any,
    ) {
        this.members = data.members;
        this.checked = data.checked;
    }

    ngOnInit() {
        console.log(this.members, this.checked, 'MC');
        if (!this.members) {
            return;
        }
        this.members.forEach(member => {
            member.isSelected = false;
        });
        this.members.forEach(member => {
            if (this.checked) {
                this.checked.forEach(checkedElem => {
                    // tslint:disable-next-line:triple-equals
                    if (checkedElem._id == member._id) {
                        member.isSelected = true;
                    }
                });
            }
        });
    }

    toggle(elem) {
        elem.isSelected = !elem.isSelected;
    }

    save() {
        this.result = [];
        this.members.forEach(member => {
            if (member.isSelected) {
                this.result.push(member);
            }
        });
        return JSON.stringify(this.result);
    }

}
