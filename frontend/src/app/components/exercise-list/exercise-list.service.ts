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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque vulputate ligula et blandit.'
      },
      {
        name: 'name2',
        type: 'type2',
        description: 'Phasellus vitae lorem eu elit elementum ultricies eget ultrices enim. Vivamus id congue mi, sit amet malesuada ante.'
      },
      {
        name: 'name3',
        type: 'type3',
        description: 'Donec quis nibh facilisis, feugiat eros porttitor, euismod ligula. Aliquam nec nisl est.'
      },
      {
        name: 'name3',
        type: 'type4',
        description: 'Quisque elementum felis non ante mollis, nec fringilla dolor fringilla.'
      }
    ];
    callback(exerciseData);
  }

  sortData(data, column, direction) {
    return data.sort((a, b) => {
      let propA = '';
      let propB = '';

      switch (column) {
        case 'name':
          [propA, propB] = [a.name, b.name];
          break;
        case 'type':
          [propA, propB] = [a.type, b.type];
          break;
      }

      const valueA = isNaN(+propA) ? propA : +propA;
      const valueB = isNaN(+propA) ? propB : +propB;

      return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    });
  }
}
