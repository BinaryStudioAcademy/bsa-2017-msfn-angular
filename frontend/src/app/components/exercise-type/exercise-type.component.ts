import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { DataSource } from "@angular/cdk";

@Component({
  selector: 'app-exercise-type',
  templateUrl: './exercise-type.component.html',
  styleUrls: ['./exercise-type.component.scss']
})
export class ExerciseTypeComponent implements OnInit {
  dataSource: ExampleDataSource | null;
  data: any;
  displayedColumns = ['userId', 'userName', 'progress'];
  constructor() { }

  ngOnInit() {
     this.data = {
       one: [1, 2, 3], 
       two: [1, 2, 3], 
       three: [1, 2, 3]
      }; 
     this.dataSource = new ExampleDataSource(this.data);
      console.log("WORK");
  }
  

}

export class ExampleDataSource extends DataSource<any> {
  data: any;
  constructor(data) {
    console.log("f");
    super();
    this.data = data;
    console.log(this.data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.data;
  }

  disconnect() {}
}
