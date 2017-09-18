import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'unread',
    pure: false
})
export class UnreadPipe implements PipeTransform {

    transform(value: any, userId?: any): any {
        if (!value) {
            return 0;
        }
        const countUnread = value.filter(item => {
            if (item.sender !== userId) {
                return (!item.read);
            }
            return false;
        }).length;
        if (countUnread > 99) {
            return '99+';
        } else {
            return countUnread;
        }
    }

}
