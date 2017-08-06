import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Component({
  selector: 'app-test-http',
  templateUrl: './test-http.component.html',
  styleUrls: ['./test-http.component.scss']
})
export class TestHttpComponent implements OnInit {

  public info: any;

  getReq: IHttpReq = {
    url: '/api/user',
    method: 'GET',
    body: {},
    failMessage: 'Failed to get all of them :(',
    successMessage: 'Yay! Here is what you asked for!'
  };

  postReq: IHttpReq = {
    url: '/api/user',
    method: 'POST',
    body: {
      name: 'Lapi',
      email: 'dus@higg.com'
    },
    failMessage: 'Failed to create a new one :(',
    successMessage: 'Hoorah! New one created'
  };

  postReq2: IHttpReq = {
    url: '/api/user',
    method: 'POST',
    body: {
      name: 'Kurvo',
      email: 'pshe@pshe.pl'
    },
    failMessage: 'Failed to create a new one :(',
    successMessage: 'Hoorah! New one created'
  };

  putReq: IHttpReq = {
    url: '/api/user/ObjectId(59867d2bdf0c152a18a99f78)',
    method: 'PUT',
    body: {
      email: 'dus@higg.com',
      firstName: 'Lapi'
    },
    failMessage: 'Failed to change info about one :(',
    successMessage: 'Gratz, new info is saved'
  };

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  sendHttp(request: IHttpReq) {
    this.httpService.sendRequest(request).then(data => {
      this.info = data;
      console.log(this.info);
    });
  }

}
