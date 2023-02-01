import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherToIconService {
  matches: { weather: string; icon: string }[] = [];
  constructor() {
    this.matches = [
      { weather: 'Thunderstorm', icon: 'thunderstorm' },
      { weather: 'Drizzle', icon: 'grain' },
      { weather: 'Rain', icon: 'rainy' },
      { weather: 'Light rain shower', icon: 'rainy' },
      { weather: 'Light rain', icon: 'grain' },
      { weather: 'Light snow', icon: 'cloudy_snowing' },
      { weather: 'Snow', icon: 'ac_unit' },
      { weather: 'Freezing fog', icon: 'ac_unit' },
      { weather: 'Mist', icon: 'sunny_snowing' },
      { weather: 'Smoke', icon: 'visibility_off' },
      { weather: 'Fog', icon: 'foggy' },
      { weather: 'Windy', icon: 'air' },
      { weather: 'Squall', icon: 'storm' },
      { weather: 'Tornado', icon: 'cyclone' },
      { weather: 'Clear', icon: 'sunny' },
      { weather: 'Clouds', icon: 'cloudy' },
      { weather: 'Overcast', icon: 'cloudy' },
      { weather: 'Partly cloudy', icon: 'partly_cloudy_day' },
      { weather: 'Haze', icon: 'sunny_snowing' },
    ];
  }
  public getIcon(weatherInput: string): string {
    let icon = 'sunny';
    var inputArray = weatherInput.toLowerCase().split(',');
    let foundMatch = undefined;
    let counter = 0;
    while (foundMatch === undefined && counter < inputArray.length) {
      let currentSearch = inputArray[counter].trim();
      foundMatch = this.matches.find((match) => {        
        return match.weather.toLowerCase() === currentSearch ? match : undefined;
      });
      counter++;
    }
    if (foundMatch !== undefined) {
      icon = foundMatch.icon;
    }
    return icon;
  }
}
