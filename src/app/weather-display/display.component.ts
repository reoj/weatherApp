import { WeatherService } from '../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FadeFromUnderAnimation } from '../animations/fade.animation';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  host: {
    class: 'parent-container',
  },
  animations: [
    FadeFromUnderAnimation,]
})
export class WeatherDisplayComponent implements OnInit, OnDestroy{
  public weatherService: WeatherService;
  public activeRoute = '/main';

  public animationState = 'void';
  constructor(public service: WeatherService, public router: Router) {
    this.weatherService = service;
  }
  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.activeRoute = this.router.url;
    });
    if (this.weatherService.hasWeather) {
      this.router.navigate(['/main/weather']);
    }
    this.animationState = 'in';
  }
  ngOnDestroy(): void {
    this.animationState = 'void';
  }
  public checkIsRouteWeather(): boolean {
    return this.activeRoute === '/main' || this.activeRoute === '/main/weather'
  }
  public checkIsRouteMoon(): boolean { 
    return this.activeRoute === '/main/moon'
  }
}
