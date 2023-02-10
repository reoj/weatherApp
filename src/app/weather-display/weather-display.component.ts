import { Subscription } from 'rxjs';
import { Weather } from 'src/app/models/weatherReport.type';

import { SuccessfulServerResponse } from '../models/weatherReport.type';
import { WeatherService } from './../services/weather.service';
import { Component, DoCheck, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css'],
  host: {
    class: 'parent-container',
  },
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  weatherDataResponse = {} as SuccessfulServerResponse;
  forecast = [] as Weather[];

  private serviceHasData: Subscription;
  public hasWeather = false;

  constructor(public WeatherService: WeatherService) {
    this.WeatherService = WeatherService;

    const observeWeatherService = {
      next: (foundWeather: boolean) => {
        this.hasWeather = foundWeather;
        if (this.hasWeather) {
          this.updateDisplay();
        }
      },
    };

    this.serviceHasData = this.WeatherService.hasWeather.subscribe(
      observeWeatherService
    );
  }

  ngOnInit(): void {
    this.WeatherService.checkIfHasWeather();
  }
  ngOnDestroy(): void {
    this.serviceHasData.unsubscribe();
  }
  private updateDisplay(): void {
    this.weatherDataResponse = this.WeatherService.getLastValidWeather();
    this.forecast = this.weatherDataResponse.weather;
  }
}
