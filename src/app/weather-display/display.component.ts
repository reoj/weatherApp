import { WeatherService } from '../services/weather.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  
})
export class WeatherDisplayComponent {
  weatherService: WeatherService;
  constructor(public service: WeatherService) {
    this.weatherService = service;
  }
}
