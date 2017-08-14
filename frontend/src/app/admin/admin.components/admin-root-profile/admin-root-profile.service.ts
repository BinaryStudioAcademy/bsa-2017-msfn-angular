import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class AdminRootProfileService {


    constructor(private httpService: HttpService) { }

    getProfile(_id, callback) {
        const request: IHttpReq = {
            url: '/api/user/' + _id,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
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
//     updateProfile(userData, callback) {
//         const request: IHttpReq = {
//             url: '/api/exercise-list',
//             method: 'PUT',
//             body: userData
//         };
//         this.httpService.sendRequest(request).then(data => {
//             console.log(data);
//             callback();
//         });
//     }
}
