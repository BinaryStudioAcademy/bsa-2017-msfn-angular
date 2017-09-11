import { AchievementInfoDialogComponent } from './../achievement-info-dialog/achievement-info-dialog.component';
import { MdDialog } from '@angular/material';
import { AchievementsListService } from './achievements-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-achievements-list',
    templateUrl: './achievements-list.component.html',
    styleUrls: ['./achievements-list.component.scss'],
    providers: [AchievementsListService]
})
export class AchievementsListComponent implements OnInit {

    achievements = [];

    constructor(private achievementsListService: AchievementsListService,
        private dialog: MdDialog) { }

    ngOnInit() {
        this.achievementsListService.getAllAchievements((allAchieves) => {
            this.achievements = allAchieves;
            this.achievementsListService.getUserAchievements((userAchieves) => {
            if (!userAchieves) {
                return;
            }
            this.achievements.forEach(ach => {
                ach.achieved = userAchieves.some(userAch => {
                    // tslint:disable-next-line:triple-equals
                    if (ach._id == userAch.achievement) {
                        ach.finished = userAch.finished;
                        return true;
                    } else {
                        return false;
                    }
                });
            });
        });
        });
    }
    openDialog(data) {
        this.dialog.open(AchievementInfoDialogComponent, {
            data: data
        });
    }

}
