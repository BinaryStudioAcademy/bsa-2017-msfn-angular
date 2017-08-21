import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class UserListService {

    constructor(private httpService: HttpService) { }

    getUsers(callback): void {
        const request: IHttpReq = {
            url: '/api/user',
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(request).then(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let role = 'user';

                if (data[i].isCoach) {
                    role = 'coach';
                }
                if (data[i].isAdmin) {
                    role = 'admin';
                }

                data[i].role = role;
            }
            callback(data);
        });
    }

    getAge(birthday: string): number| string {
        if (!birthday) {
            return 'unknown';
        }

        const dateOfBirth = new Date(birthday),
            timeDiff = Date.now() - dateOfBirth.getTime(),
            timeDiffDate = new Date(timeDiff),
            age = timeDiffDate.getFullYear() - 1970;

        return age;
    }

    sortData(data, column, direction) {
        return data.sort((a, b) => {
            let propA = '',
                    propB = '';

            switch (column) {
                case 'firstName':
                    [propA, propB] = [a.firstName.toLowerCase(), b.firstName.toLowerCase()];
                    break;
                case 'lastName':
                    [propA, propB] = [a.lastName.toLowerCase(), b.lastName.toLowerCase()];
                    break;
                case 'email':
                    [propA, propB] = [a.email.toLowerCase(), b.email.toLowerCase()];
                    break;
                case 'role':
                    [propA, propB] = [a.role, b.role];
                    break;
                case 'age':
                    [propA, propB] = [a.age, b.age];
                    break;
                case 'gender':
                    [propA, propB] = [a.gender, b.gender];
                    break;
            }

            const valueA = isNaN(+propA) ? propA : +propA;
            const valueB = isNaN(+propA) ? propB : +propB;

            return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
        });
    }
}
