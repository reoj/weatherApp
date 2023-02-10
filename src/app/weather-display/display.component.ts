import { WeatherService } from '../services/weather.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class WeatherDisplayComponent {
  public weatherService: WeatherService;
  public activeRoute = '/';
  constructor(public service: WeatherService, public router: Router) {
    this.weatherService = service;
  }
}
