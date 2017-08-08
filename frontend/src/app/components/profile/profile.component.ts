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
  selectedYear: number;
  private profileForm;

  user = {
    email: 'john.smith@gmail.com',
    birthday: {
      day: '25',
      month: 'February',
      year: 1996
    }
  };

  constructor(public profileService: ProfileService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.months = this.profileService.getMonth();
    this.days = this.profileService.getDays(this.user.birthday.month, this.user.birthday.year);
    this.years = this.profileService.getYears();
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      'name': ['John', Validators.compose([Validators.required, Validators.minLength(2)])],
      'lastname': ['Smith', Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': this.user.email,
      'weight': [80, Validators.compose([Validators.required, Validators.min(30), Validators.max(300)])],
      'height': [180, Validators.compose([Validators.required, Validators.min(100), Validators.max(300)])],
    });
  }

  onSelect(month: string) {
    this.days = this.profileService.getDays(month, this.user.birthday.year);

  }
}
