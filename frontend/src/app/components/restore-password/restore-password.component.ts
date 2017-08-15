import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IHttpReq } from '../../models/http-req';
import { HttpService } from '../../services/http.service';
import { ToasterService } from '../../services/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';


@Component({
    selector: 'app-restore-password',
    templateUrl: './restore-password.component.html',
    styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

    confirmCode: string;
    email: string;
    newPass: string;
    repeatPass: string;
    passwordMatched: boolean;


    constructor(
        private httpHandler: HttpService,
        private toastrService: ToasterService,
        public router: ActivatedRoute,
        private encryptor: EncryptService
    ) { }

    ngOnInit() {
        this.passwordMatched = false;
        if (this.router.snapshot.params.code) {
            this.confirmCode = this.router.snapshot.params.code;
        }
    }

    changePassword(form: NgForm) {
        this.passwordMatched = this.newPass === this.repeatPass;
        if (form.valid && this.passwordMatched) {
            const encData = this.encryptor.encrypt({
                'password': this.newPass,
                'email': this.email,
                'confirmCode': this.confirmCode
            });
            const sendData: IHttpReq = {
                url: '/api/password',
                method: 'PUT',
                body: {
                    data: encData
                }
            };

        this.httpHandler.sendRequest(sendData)
            .then((res) => {
                if (res.access) {
                    this.toastrService.showMessage('success', 'Password changed');
                }
            });
            // send message()
        } else {
            console.log('ER');
        }
    }

}
