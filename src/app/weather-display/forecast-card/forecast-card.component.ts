import { WeatherDisplayComponent } from './../weather-display.component';
import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weatherReport.model';

@Component({
  selector: 'forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css'],
})
export class ForecastCardComponent implements OnInit {
  icons = ['rainy', 'cloudy', 'sunny', 'snowy'];
  icon = 'rainy';
  isHourly = false;
  @Input() forecast: Weather = {} as Weather;
  @Input() title = 'Today';

  ngOnInit(): void {
    this.isHourly = this.containsHourly(this.forecast);
    if (this.isHourly) {
      this.buildHourlyForecast(this.forecast);
    } else {
      this.buildGeneralForecast(this.forecast);
    }
    this.displayResult();
  }

  public containsHourly(forecast: Weather): boolean {
    return forecast.hourly !== undefined;
  }

  buildHourlyForecast(forecast: Weather) {
    throw new Error('Function not implemented.');
  }

  buildGeneralForecast(forecast: Weather) {
    throw new Error('Function not implemented.');
  }

  displayResult() {
    throw new Error('Function not implemented.');
  }
}
