import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-sports-modification',
  templateUrl: './sports-modification.component.html',
  styleUrls: ['./sports-modification.component.scss']
})
export class SportsModificationComponent implements OnInit {
  regForm: FormGroup;
  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.regForm = this.fb.group({
      'name': [null, Validators.required]

    });
  }

}
