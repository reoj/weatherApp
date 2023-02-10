import { WeatherService } from './../services/weather.service';
import { Astronomy } from './../models/weatherReport.type';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moon-display',
  templateUrl: './moon-display.component.html',
  styleUrls: ['./moon-display.component.css'],
  host:{
    class: 'parent-container'
  }
})
export class MoonDisplayComponent implements OnDestroy, OnInit {
  moonPhases = [] as Astronomy[];

  private serviceHasData: Subscription;
  public isDataReady = true;

  constructor(public weatherService: WeatherService) {
    this.weatherService = weatherService;

    const observeWeatherService = {
      next: (foundWeather: boolean) => {
        this.isDataReady = foundWeather;
        if (this.isDataReady) {
          this.updateMoonDisplay();
        }
      },
    };

    this.serviceHasData = this.weatherService.hasWeather.subscribe(
      observeWeatherService
    );
  }
  ngOnDestroy(): void {
    this.serviceHasData.unsubscribe();
  }
  ngOnInit(): void {
    this.weatherService.checkIfHasWeather();
  }

  updateMoonDisplay() {
    var fullData = this.weatherService.getLastValidWeather().weather;
    var newArrayOfMoonPhases = [] as Astronomy[];
    fullData.forEach((day) => {
      newArrayOfMoonPhases.push(day.astronomy[0]);
    });
    this.moonPhases = newArrayOfMoonPhases;
  }
}
