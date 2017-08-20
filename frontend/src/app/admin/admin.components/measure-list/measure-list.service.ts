import {Injectable} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {IHttpReq} from '../../../models/http-req';
import IMeasurementType = MeasurementApi.IMeasurementType;
import IMeasureUnit = MeasurementApi.IMeasureUnit;

@Injectable()
export class MeasureListService {
    public measureName;

    constructor(private httpService: HttpService) { }

    getAllMeasurements(callback): void {
        const request: IHttpReq = {
            url: '/api/measurement',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then( data => {
                callback(data);
            });
    }

    addMeasurement(measureUnits: IMeasureUnit[], measureName: string, callback): void {
        const measureBody = this.preproccessData(measureUnits, measureName);
        const request: IHttpReq = {
            url: '/api/measurement',
            method: 'POST',
            body: measureBody,
            successMessage: 'Added',
            failMessage: 'Failed to add'
        };
        this.httpService.sendRequest(request)
            .then(
                data => callback(data)
            );
    }

    deleteMeasurement(body: IMeasureUnit, callback) {
        const request: IHttpReq = {
            url: '/api/measurement',
            method: 'DELETE',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => callback(data));
    }

    updateMeasurement(id: string, measureUnits: IMeasureUnit[], measureName: string, callback) {
        const measureBody = this.preproccessData(measureUnits, measureName, id);
        const request: IHttpReq = {
            url: 'api/measurement/',
            method: 'PUT',
            body: measureBody,
            successMessage: 'Updated',
            failMessage: 'Failed to update'
        };
        this.httpService.sendRequest(request)
            .then( data => callback(data));
    }

    updateMeasurementFull(body, callback) {
        const request: IHttpReq = {
            url: 'api/measurement/',
            method: 'PUT',
            body,
            successMessage: 'Updated',
            failMessage: 'Failed to update'
        };
        this.httpService.sendRequest(request)
            .then( data => callback(data));
    }

    sortData(data, column, direction = 'asc' || 'desc') {
        return data.sort((a, b) => {
            let propA = '';
            let propB = '';
            switch (column) {
                case 'code': [propA, propB] = [a.code, b.code]; break;
                case 'measureName': [propA, propB] = [a.measureName, b.measureName]; break;
            }
            const valueA = isNaN(+propA) ? propA : +propA;
            const valueB = isNaN(+propA) ? propB : +propB;
            return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
        });
    }

    getMeasurementByName(name: string, callback) {
        const request: IHttpReq = {
            url: `/api/measurement/by-name/${name}`,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => callback(data));
    }

    getMeasurementById(id, callback): void {
        const request: IHttpReq = {
            url: '/api/measurement/' + id,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }
    // inputUnit { unitName, conversionFactor}
    private preproccessData(inputUnits: IMeasureUnit[], measureName: string, id?: string): IMeasurementType {
        const measureObj = {
            measureName: measureName,
            measureUnits: inputUnits
        };
        if (id) { Object.assign(measureObj, { id }); }
        return measureObj;
    }

}
