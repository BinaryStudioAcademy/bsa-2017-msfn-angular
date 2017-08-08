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

  getReqOne: IHttpReq = {
    url: '/api/user/5986810b98fdb71ab46086ff',
    method: 'GET',
    body: {},
    failMessage: 'Failed to get all of them :(',
    successMessage: 'Yay! Here is what you asked for!'
  };

  getReqNoMessages: IHttpReq = {
    url: '/api/user',
    method: 'GET',
    body: {}
  };

  getReqErr: IHttpReq = {
    url: '/api/unknownroute',
    method: 'GET',
    body: {},
    failMessage: 'Failed to get all of them :(',
    successMessage: 'Yay! Here is what you asked for!'
  };

  postReq: IHttpReq = {
    url: '/api/user',
    method: 'POST',
    body: {
      id: 2,
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

  // To change url, for some created Mongo id
  putReq: IHttpReq = {
    url: '/api/user/59870b81d7e97922784f1356',
    method: 'PUT',
    body: {
      email: 'dus@higg.com',
      firstName: 'Lapi'
    },
    failMessage: 'Failed to change info about one :(',
    successMessage: 'Gratz, new info is saved'
  };

  putReq2: IHttpReq = {
    url: '/api/user/2',
    method: 'PUT',
    body: {
      email: 'changed@email.com',
      firstName: 'user2'
    },
    failMessage: 'Failed to change info about one :(',
    successMessage: 'Gratz, new info is saved'
  };
  // To change url, for some created Mongo id
  deleteReq: IHttpReq = {
    url: '/api/user/59870b81d7e97922784f1356',
    method: 'DELETE',
    body: {},
    failMessage: 'Failed to delete :(',
    successMessage: 'Instance was deleted'
  };

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  // Console.log is also just for testing purpose
  sendHttp(request: IHttpReq) {
    this.httpService.sendRequest(request).then(data => {
      this.info = data;
      console.log(this.info);
    });
  }

}
