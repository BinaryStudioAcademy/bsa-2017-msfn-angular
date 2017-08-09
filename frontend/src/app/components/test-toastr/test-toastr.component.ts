import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-toastr',
  templateUrl: './test-toastr.component.html',
  styleUrls: ['./test-toastr.component.scss']
})
export class TestToastrComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  showSuccess(msg: string, heading: string) {
    this.toastr.success(msg || 'Some Success Message!', heading || 'Toastr fun!');
  }
  showWarning() {
    this.toastr.warning('Some Warning Message!', 'Toastr fun!');
  }
  showError() {
    this.toastr.error('Some Error Message!', 'Toastr fun!');
  }
  showInfo() {
    this.toastr.info('Some Info Message!', 'Toastr fun!');
  }

}
