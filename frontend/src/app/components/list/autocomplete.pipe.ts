import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'autocompletePipe'
})
export class AutocompletePipe implements PipeTransform {

    transform(value: string[], filter: string): any {
        return value.filter(item => {
            if (!filter) {
                return false;
            }
            return item.includes(filter);
        });
    }

}
