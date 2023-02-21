import { FadeFromUnderAnimation } from '../../animations/fade.animation';
import { WeatherService } from '../../services/weather.service';
import { Weather } from 'src/app/models/weatherReport.type';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'weather-grid',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  host: {
    class: 'parent-container',
  },
  animations: [
    FadeFromUnderAnimation
  ],
})
export class WeatherComponent implements OnInit, OnDestroy {
  public service: WeatherService;
  public forecast = [] as Weather[];
  public animationState = 'void';

  constructor(public WeatherService: WeatherService) {
    this.service = WeatherService;
  }
  ngOnInit(): void {
    if (this.service.hasWeather) {
      this.forecast = this.service.getLastValidWeather().weather;
    }
    this.animationState = 'in';
  }
  ngOnDestroy(): void {
    this.animationState = 'void';
    this.service.checkIfHasWeather();
  }
}
