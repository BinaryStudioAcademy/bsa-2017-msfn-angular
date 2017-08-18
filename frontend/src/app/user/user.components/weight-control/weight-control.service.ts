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
                    weight: newestItem.weight - recentItem.weight,
                    bones: newestItem.boneWeight - recentItem.boneWeight,
                    water: newestItem.waterPct - recentItem.waterPct,
                    fat: newestItem.fatPct - recentItem.fatPct
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

        for (let i = 0; i < items.length - 1; i++) {
            weightSum += items[i].weight;
            boneSum += items[i].boneWeight;
            waterSum += items[i].waterPct;
            fatSum += items[i].fatPct;
        }

        const weightAvg = weightSum / (items.length - 1),
            boneAvg = boneSum / (items.length - 1),
            waterAvg = waterSum / (items.length - 1),
            fatAvg = fatSum / (items.length - 1);

        if (numberOfItems > 1) {
            const newestItem = items[numberOfItems - 1],
                weightDiff = (Math.round(newestItem.weight - weightAvg) * 10) / 10,
                boneDiff = (Math.round(newestItem.boneWeight - boneAvg) * 10) / 10,
                waterDiff = (Math.round(newestItem.waterPct - waterAvg) * 10) / 10,
                fatDiff = (Math.round(newestItem.fatPct - fatAvg) * 10) / 10;

            const recentDiff = {
                weight: weightDiff,
                bones: boneDiff,
                water: waterDiff,
                fat: fatDiff
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
        const selection = option;
        let symbol = '',
            measurement: string,
            betterResult = false,
            worseResult = false;

        if (diff[option] > 0) {
            worseResult = true;
            symbol = '+';
        } else if (diff[option] < 0) {
            betterResult = true;
        }

        if (option === 'weight' || option === 'bones') {
            measurement = 'kg';
        } else {
            measurement = '%';
        }

        return {
            betterResult,
            worseResult,
            selection,
            symbol,
            measurement
        };
    }
}
