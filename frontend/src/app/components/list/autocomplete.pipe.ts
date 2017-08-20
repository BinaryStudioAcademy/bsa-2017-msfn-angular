import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'autocompletePipe'
})
export class AutocompletePipe implements PipeTransform {

    transform(value: string[], filter: string): any {
        console.log(value, filter);
        return value.filter(item => {
            if (!filter) {
                return false;
            }
            filter = filter.toLowerCase();
            return item.toLowerCase().includes(filter);
        });
    }

}
