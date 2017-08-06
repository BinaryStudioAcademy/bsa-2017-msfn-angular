import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  months = [];
  days = [];
  years = [];
  selectedMonth: string;
  selectedDay: string;
  selectedYear: string;

  private profileForm;
  constructor(public profileService: ProfileService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.months = this.profileService.getMonth();
    this.days = this.profileService.getDays();
    this.years = this.profileService.getYears();
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      'name': 'John',
      'lastname': 'Smith'
    });
  }
  onClick() {

  }
}
