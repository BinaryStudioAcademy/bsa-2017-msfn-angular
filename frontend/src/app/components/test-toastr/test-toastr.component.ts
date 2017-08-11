import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../services/toastr.service';

@Component({
    selector: 'app-test-toastr',
    templateUrl: './test-toastr.component.html',
    styleUrls: ['./test-toastr.component.scss']
})
export class TestToastrComponent implements OnInit {

    constructor(public toastrService: ToastrService) { }

    ngOnInit() {
    }

    // Please check toastr.service.ts to see, that showMessage() expects to get 3 arguments:
    // 1 - Type of message (it's color), 2 - Some text of message (may be null), 3 - Some heading of message (has defaults).

    // Showing some Success (green) message to user
    showSuccess() {
        this.toastrService.showMessage('success', 'Some success message', 'Success Heading!');
    }

    // e.g. User tried to log in, but was declined. It could look somthing like this:
    userDeclined() {
        this.toastrService.showMessage('error', 'Your login attempt was declined', 'Oh, sorry!');
    }

    // Just notify user about something not so important. With omitted heading
    notifyUser() {
        this.toastrService.showMessage('info', 'How are you?');
    }

    // Or maybe Warn user about something))
    getSomeWarning() {
        this.toastrService.showMessage('warning', 'Please, just wait a bit', 'Stop!');
    }
}
