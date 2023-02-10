import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'twentyfourHours'
})

export class TwentyFourHourPipe implements PipeTransform {
    transform(value: string, ...args: any[]): string {
        var hour = value;
        if (value.length === 1) {
            hour = "0" + value;
        }
        return hour + ":00";
    }
}