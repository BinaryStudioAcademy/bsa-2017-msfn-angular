import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { ITribePost } from '../../../models/tribe-post';
import { CropperSettings } from 'ng2-img-cropper';

@Injectable()
export class TribeService {

    constructor(
        private httpService: HttpService
    ) { }

    getUserById(id, callback) {
        const request: IHttpReq = {
            url: '/api/user/' + id,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }

    getTribe(id, callback) {
        const request: IHttpReq = {
            url: `api/tribe/${id}`,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then((data) => {
                callback(data);
            });
    }

    getAllTribes(callback) {
        const request: IHttpReq = {
            url: 'api/tribe',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then((data) => {
                callback(data);
            });
    }

    getPostsByTribe(id, callback) {
        const request: IHttpReq = {
            url: `/api/tribe/${id}/posts`,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then((data) => {
                callback(data);
            });
    }

    getTribesByCreator(creatorId, callback) {
        const request: IHttpReq = {
            url: `api/tribe/creator/${creatorId}`,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then((data) => {
                callback(data);
            });
    }

    commentPost(tribeId, postId, userId, text, callback) {
        const request: IHttpReq = {
            url: `/api/tribe/${tribeId}/comments`,
            method: 'PUT',
            body: {
                id: postId,
                author: userId,
                text: text
            }
        };
        this.httpService.sendRequest(request)
            .then((data) => { callback(data); });
    }

    createPost(body: ITribePost, callback) {
        Object.assign(body, { tribe: body.tribe });
        const request: IHttpReq = {
            url: `/api/tribe/${body.tribe}/posts`,
            method: 'POST',
            body: body,
            successMessage: 'Post added',
            failMessage: 'Cannot add post'
        };
        this.httpService.sendRequest(request)
            .then((data) => {
                callback(data);
            });
    }

    createTribe(body, callback) {
        const request: IHttpReq = {
            url: '/api/tribe',
            method: 'POST',
            body: body,
            successMessage: 'Tribe created',
            failMessage: 'Cannot create tribe'
        };
        this.httpService.sendRequest(request)
            .then((data) => {
                callback(data);
            });
    }

    addFollower(tribeId, userId, callback) {
        const request: IHttpReq = {
            url: `api/tribe/${tribeId}/followers`,
            method: 'PUT',
            body: {
                newMember: userId
            }
        };
        this.httpService.sendRequest(request)
            .then((data) => {
                callback(data);
            });
    }

    getCropperSettings(): CropperSettings {
        const cropperSettings = new CropperSettings();
        cropperSettings.noFileInput = true;
        cropperSettings.width = 225;
        cropperSettings.height = 150;
        cropperSettings.croppedWidth = 300;
        cropperSettings.croppedHeight = 200;
        cropperSettings.canvasWidth = 225;
        cropperSettings.canvasHeight = 175;
        cropperSettings.dynamicSizing = true;
        cropperSettings.preserveSize = true;
        cropperSettings.touchRadius = 10;
        return cropperSettings;
    }

    saveImg(image, fileName, fileType, folder, callback) {
        const sendData: IHttpReq = {
            url: '/api/file',
            method: 'POST',
            body: { data: image, fileName: fileName, fileType: fileType, folder: folder },
        };

        this.httpService.sendRequest(sendData).then(data => {
            callback(data);
        });
    }

    updateTribe(body, callback) {
        const sendData: IHttpReq = {
            url: '/api/tribe',
            method: 'PUT',
            body: body,
            successMessage: 'Permissions updated',
            failMessage: 'Cannot update permissions'
        };

        this.httpService.sendRequest(sendData).then(data => {
            callback(data);
        });
    }

    getTribeMembers(id, whom, callback) {
        const request: IHttpReq = {
            url: `/api/tribe/${whom}/${id}`,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then((data) => {
                callback(data);
            });
    }
}
