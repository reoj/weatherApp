import { WeatherService } from './../services/weather.service';
import { Astronomy } from './../models/weatherReport.type';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moon-display',
  templateUrl: './moon-display.component.html',
  styleUrls: ['./moon-display.component.css'],
})
export class MoonDisplayComponent implements OnDestroy, OnInit {
  moonPhases = [] as Astronomy[];

  public service: WeatherService;
  
  constructor(public WeatherService: WeatherService) {
    this.service = WeatherService;
  }
  ngOnInit(): void {
    if (this.service.hasWeather) {
      this.updateMoonDisplay();
    }
  }
  ngOnDestroy(): void {
    this.service.checkIfHasWeather();
  }

  updateMoonDisplay() {
    var fullData = this.service.getLastValidWeather().weather;
    var newArrayOfMoonPhases = [] as Astronomy[];
    fullData.forEach((day) => {
      newArrayOfMoonPhases.push(day.astronomy[0]);
    });
    this.moonPhases = newArrayOfMoonPhases;
  }
}
