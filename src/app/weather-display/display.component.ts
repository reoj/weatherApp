import { WeatherService } from '../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FadeFromUnderAnimation } from './animations/fade.animation';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  animations: [
    FadeFromUnderAnimation,]
})
export class WeatherDisplayComponent implements OnInit, OnDestroy{
  public weatherService: WeatherService;
  public activeRoute = '/';

  public animationState = 'void';
  constructor(public service: WeatherService, public router: Router) {
    this.weatherService = service;
  }
  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.activeRoute = this.router.url;
    });
    this.animationState = 'in';
  }
  ngOnDestroy(): void {
    this.animationState = 'void';
  }
  public checkIsRouteWeather(): boolean {
    return this.activeRoute === '/' || this.activeRoute === '/weather'
  }
  public checkIsRouteMoon(): boolean { 
    return this.activeRoute === '/moon'
  }
}
