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
    this.achievementsListService.getAllAchievements((data) => {
      this.achievements = data;
    });
  }
  openDialog(data) {
    this.dialog.open(AchievementInfoDialogComponent, {
            data: data
        });
  }

}
