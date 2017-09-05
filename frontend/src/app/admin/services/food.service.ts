import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';
import { IFood } from '../../models/food';
import { IFoodType } from '../../models/food-type';
import { CropperSettings } from 'ng2-img-cropper';


@Injectable()
export class FoodService {

    constructor(private httpService: HttpService) {}

    getAllFoodTypes(callback): void {
        const request: IHttpReq = {
            url: 'api/food-type',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then( data => {
                callback(data);
            });
    }
    addFoodType(body: IFoodType, callback): void {
        const request: IHttpReq = {
            url: 'api/food-type',
            method: 'POST',
            body: body,
            successMessage: 'Added',
            failMessage: 'Failed to add food type'
        };
        this.httpService.sendRequest(request)
            .then(
                data => callback(data)
            );
    }
    deleteFoodType(body: IFoodType, callback): void {
        body.isRemoved = true;
        this.updateFoodType(body, callback);
    }
    updateFoodType(body: IFoodType, callback) {
        const request: IHttpReq = {
            url: 'api/food-type',
            method: 'PUT',
            body: body
        };
        this.httpService.sendRequest(request)
            .then(
                data => callback(data)
            );
    }
    addFood(body: IFood, callback): void {
        const request: IHttpReq = {
            url: 'api/food',
            method: 'POST',
            body: body,
            successMessage: 'Added',
            failMessage: 'Failed to add food'
        };
        this.httpService.sendRequest(request)
            .then(
                data => callback(data)
            );
    }
    getAllFood(callback): void {
        const request: IHttpReq = {
            url: 'api/food',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then( data => {
                callback(data);
            });
    }
    deleteFood(body: IFood, callback): void {
        body.isRemoved = !body.isRemoved;
        this.updateFood(body, callback);
    }
    updateFood(body: IFood, callback) {
        const request: IHttpReq = {
            url: 'api/food',
            method: 'PUT',
            body: body
        };
        this.httpService.sendRequest(request)
            .then(
                data => callback(data)
            );
    }
    sortfoodTypesData(data, column, direction = 'asc' || 'desc') {
        return data.sort((a, b) => {
            let propA = '';
            let propB = '';
            switch (column) {
                case 'name': [propA, propB] = [a.name, b.name]; break;
                case 'description': [propA, propB] = [a.description, b.description]; break;
            }
            const valueA = isNaN(+propA) ? propA : +propA;
            const valueB = isNaN(+propA) ? propB : +propB;
            return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
        });
    }
    saveImg(image, fileName, fileType, folder, callback) {
        const sendData: IHttpReq = {
            url: '/api/file',
            method: 'POST',
            body: {data: image, fileName: fileName, fileType: fileType, folder: folder},
        };

        this.httpService.sendRequest(sendData).then(data => {
            callback(data);
        });
    }
    getCropperSettings(): CropperSettings {
        const cropperSettings = new CropperSettings();
        cropperSettings.noFileInput = true;
        cropperSettings.width = 150;
        cropperSettings.height = 150;
        cropperSettings.croppedWidth = 150;
        cropperSettings.croppedHeight = 150;
        cropperSettings.canvasWidth = 150;
        cropperSettings.canvasHeight = 150;
        cropperSettings.dynamicSizing = true;
        cropperSettings.touchRadius = 10;
        return cropperSettings;
    }
}
