import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { IHttpReq } from './../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Component({
    selector: 'app-select-sport',
    templateUrl: './select-sport.component.html',
    styleUrls: ['./select-sport.component.scss']
})
export class SelectSportComponent implements OnInit {

    sportList = [];
    selectedSports = [];

    constructor(
        private dialogRef: MdDialogRef<SelectSportComponent>,
        private dialog: MdDialog,
        @Inject(MD_DIALOG_DATA) public data: any,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.getSportTypes(res => {
            if (res.length === 1 && !res[0].name) {
                this.sportList = [];
            } else {
                this.sportList = this.removeCheckedSports(res);
            }
        });
    }

    getSportTypes(callback) {
        const request: IHttpReq = {
            url: '/api/sport/',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }

    selectExercise(sport) {
        const idsOfSport = [];
        this.selectedSports.forEach(el => {
            idsOfSport.push(el._id);
        });
        if (!idsOfSport.includes(sport._id)) {
            this.selectedSports.push(sport);
        } else {
            this.selectedSports.splice(idsOfSport.indexOf(sport._id, 1));
        }
    }

    removeCheckedSports(list) {
        const listOfChekedExercise = [];
        this.data.forEach(el => {
            listOfChekedExercise.push(el._id);
        });
        return list.filter(el => {
            return !listOfChekedExercise.includes(el._id);
        });
    }
}
