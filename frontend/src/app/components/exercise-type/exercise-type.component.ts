import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Component({
  selector: 'app-exercise-type',
  templateUrl: './exercise-type.component.html',
  styleUrls: ['./exercise-type.component.scss']
})
export class ExerciseTypeComponent implements OnInit {
  dataSource: ExampleDataSource | null;
  data: any;
  testName: string;
  displayedColumns = ['userId', 'userName', 'progress'];
  constructor(public httpService: HttpService) { }

  ngOnInit() {
    this.testName = 'Roping';
    this.data = {
      one: [1, 2, 3],
      two: [1, 2, 3],
      three: [1, 2, 3]
    };
    this.dataSource = new ExampleDataSource(this.data);
  }

  addExerciseType(name: string) {
    const request: IHttpReq = {
      url: '/api/exercise-type',
      method: 'POST',
      body: {
        name: name
      }
    };
    this.httpService.sendRequest(request).then(data => {
      console.log(data);
      // HERE UPDATE ID COLUMN
    });
  }

  getAllExerciseTypes() {
    const request: IHttpReq = {
      url: '/api/exercise-type',
      method: 'GET',
      body: {}
    };
    this.httpService.sendRequest(request).then(data => {
      console.log(data);
      // HERE DATA FOR COLUMNS
    });

  }
  deleteExerciseTypeByCode(code: number) {
    const request: IHttpReq = {
      url: '/api/exercise-type/' + code.toString(),
      method: 'DELETE',
      body: {}
    };
    this.httpService.sendRequest(request).then(data => {
      console.log(data);
      // UPDATE COL AFTER DELETING
    });
  }


  updateExerciseTypeByCode(code: number, name: string) {
    const request: IHttpReq = {
      url: '/api/exercise-type',
      method: 'PUT',
      body: {
        code: code,
        name: name
      }
    };
    this.httpService.sendRequest(request).then(data => {
      console.log(data);
      // UPDATE COL AFTER UPDATING
    });
  }
}



export class ExampleDataSource extends DataSource<any> {
  data: any;
  constructor(data) {
    super();
    this.data = data;
    console.log(this.data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.data;
  }

  disconnect() { }
}
