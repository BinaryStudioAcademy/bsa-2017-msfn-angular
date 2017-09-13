import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'totalUnread',
    pure: false
})
export class TotalUnreadPipe implements PipeTransform {

    transform(value: any, userId?: any): any {
        let countUnread = 0;
        value.forEach(chat => {
            if (chat && chat.messages) {
                chat.messages.forEach(message => {
                    if (message.sender !== userId && message.read === false) {
                        countUnread++;
                    }
                });
            }
        });
        if (countUnread > 99) {
            return '99+';
        } else {
            return countUnread;
        }
    }

}
