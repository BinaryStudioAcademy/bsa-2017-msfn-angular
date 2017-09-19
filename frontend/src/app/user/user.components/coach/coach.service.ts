import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class CoachService {

    constructor(private httpService: HttpService) {
    }

    getTrainingPlans(id: string, callback): void {
        const sendData: IHttpReq = {
            url: '/api/training-plan/user/' + id,
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }

    getArticles(id: string, callback): void {
        const sendData: IHttpReq = {
            url: '/api/articles/user/' + id,
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }

    getRandomTestimonials(testimonialData: any[]): any[] {
        if (testimonialData.length < 3) {
            return testimonialData;
        }
        const max = Math.floor(testimonialData.length);
        const index1 = Math.floor(Math.random() * max);
        let index2 = index1;
        while (index2 === index1) {
            index2 = Math.floor(Math.random() * max);
        }

        return [testimonialData[index1], testimonialData[index2]];
    }

    getSocialLinks(userData): any[] {
        const socialLinks = [];

        const rawSocialLinks = [
            {
                name: 'Facebook',
                id: userData.facebookID,
                link: 'https://www.facebook.com/',
                color: '#5081e8'
            },
            {
                name: 'Google+',
                id: userData.googleID,
                link: 'https://plus.google.com/',
                color: '#dd4d40'
            },
            {
                name: 'Twitter',
                id: userData.twitterID,
                link: 'https://twitter.com/intent/user?user_id=',
                color: '#36b9ff'
            }
        ];

        for (const rawSocialLink of rawSocialLinks) {
            if (rawSocialLink.id) {
                rawSocialLink.link += rawSocialLink.id;
                socialLinks.push(rawSocialLink);
            }
        }

        return socialLinks;
    }
}
