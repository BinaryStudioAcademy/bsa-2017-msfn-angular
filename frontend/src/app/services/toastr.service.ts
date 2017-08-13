import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToasterService {

    constructor(public toastr: ToastrService) {
        this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
     }

    // Method showMessage() expects to get 3 arguments:
    // 1 - Type of message (it's color), 2 - Some text of message (may be null), 3 - Some heading of message (has defaults).
    showMessage(type: 'success' | 'warning' | 'error' | 'info', msg: string, heading?: string) {
        switch (type) {
            // to get "green" message - send 'success' as first argument
            case ('success'):
            this.toastr.success(msg || '', heading || 'Success');
            break;
            // to get "yellow" message - send 'warning' as first argument
            case ('warning'):
            this.toastr.warning(msg || '', heading || 'Warning');
            break;
            // to get "red" message - send 'error' as first argument
            case ('error'):
            this.toastr.error(msg || '', heading || 'Error');
            break;
            // to get "blue" message - send 'info' as first argument
            case ('info'):
            this.toastr.info(msg || '', heading || 'Info');
            break;
            default: break;
        }
    }
}
