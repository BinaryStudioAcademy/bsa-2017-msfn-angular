import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Injectable()
export class ExerciseListService {

  constructor(private httpService: HttpService) { }

  getExercises(callback): void {
    let exerciseData = [];
    const request: IHttpReq = {
      url: '/api/exercise-list',
      method: 'GET',
      body: {}
    };
    // this.httpService.sendRequest(request).then(data => {
    //   console.log(data);
    //   callback(data);
    // });

    exerciseData = [
      {
        name: 'name1',
        type: 'type1',
        description: 'description1'
      },
      {
        name: 'name2',
        type: 'type2',
        description: 'description2'
      },
      {
        name: 'name3',
        type: 'type3',
        description: 'description3'
      }
    ];
    callback(exerciseData);
  }

  sortData(data, column, direction) {
    return data.sort((a, b) => {
      let propA = '';
      let propB = '';

      switch (column) {
        case 'name': [propA, propB] = [a.name, b.name];
          break;
        case 'type': [propA, propB] = [a.type, b.type];
          break;
      }

      const valueA = isNaN(+propA) ? propA : +propA;
      const valueB = isNaN(+propA) ? propB : +propB;

      return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    });
  }
}
