import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string, unit?: string): string {
    var numberValue = Number(value);
    if (unit === 'F') {
      return this.celsiusToFahrenheit(numberValue).toFixed(0) + ' °F';
    }
    return numberValue.toFixed(0) + ' °C';
  }
  celsiusToFahrenheit(value: number) {
    return (value * 9) / 5 + 32;
  }
}
