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
}
