import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { DateService } from '../../../services/date.service';

@Injectable()
export class WeightControlService {

    constructor(private httpService: HttpService,
                private dateService: DateService) { }

    getWeightItems(callback) {
        const request: IHttpReq = {
            url: '/api/weight-control',
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    addWeight(data, callback) {
        const request: IHttpReq = {
            url: '/api/weight-control/add',
            method: 'PUT',
            body: data
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    getWeeklyWeightItems(items: any[]) {
        const weeklyItems = [];
        const currentDate = new Date();
        for (const item of items) {
            const itemDate = new Date(item.date);
            const timeDiff = currentDate.getTime() - itemDate.getTime();
            const dayAmount = timeDiff / 1000 / 60 / 60 / 24;

            if (dayAmount < 7) {
                weeklyItems.push(item);
            } else {
                break;
            }
        }

        return weeklyItems;
    }

    getRecentDiff(items: any[]) {
        const numberOfItems = items.length;

        if (numberOfItems > 1) {
            const newestItem = items[numberOfItems - 1],
                recentItem = items[numberOfItems - 2],
                recentDiff = {
                    we: newestItem.weight - recentItem.weight,
                    b: newestItem.boneWeight - recentItem.boneWeight,
                    wa: newestItem.waterPct - recentItem.waterPct,
                    f: newestItem.fatPct - recentItem.fatPct
                };

            return recentDiff;
        } else {
            return;
        }
    }

    getWeeklyDiff(items: any[]) {
        const numberOfItems = items.length;
        let weightSum = 0,
            boneSum = 0,
            waterSum = 0,
            fatSum = 0;

        for (const item of items) {
            weightSum += item.weight;
            boneSum += item.boneWeight;
            waterSum += item.waterPct;
            fatSum += item.fatPct;
        }

        const weightAvg = weightSum / items.length,
            boneAvg = boneSum / items.length,
            waterAvg = waterSum / items.length,
            fatAvg = fatSum / items.length;

        if (numberOfItems > 1) {
            const newestItem = items[numberOfItems - 1],
                recentDiff = {
                    we: newestItem.weight - weightAvg,
                    b: newestItem.boneWeight - boneAvg,
                    wa: newestItem.waterPct - waterAvg,
                    f: newestItem.fatPct - fatAvg
                };

            return recentDiff;
        } else {
            return;
        }
    }

    getRecentDay(recentItem) {
        const currentDate = new Date(),
            currentDay = currentDate.getDate();

        const recentDate = new Date(recentItem.date),
            recentDay = recentDate.getDate();

        const timeDiff = currentDate.getTime() - recentDate.getTime(),
            dayAmount = timeDiff / 1000 / 60 / 60 / 24;

        if (currentDay === recentDay && dayAmount < 1) {
            return 'today';
        } else if (dayAmount < 1) {
            return 'yesterday';
        } else {
            return this.dateService.convertDateToIso(recentDate);
        }
    }

    changeOption(option, diff) {
        const selection = option.value;
        let symbol: string;
        let measurement: string;

        if (diff[option.value] > 0) {
            symbol = '+';
        } else if (diff[option.value] < 0) {
            symbol = '-';
        } else {
            symbol = '';
        }

        if (option.value === 'we' || option.value === 'b') {
            measurement = 'kg';
        } else {
            measurement = '%';
        }

        return {
            selection,
            symbol,
            measurement
        };
    }
}
