import { ServerResponse } from './../models/weatherReport.model';
import { SnackbarcontrolService } from './../services/snackbarcontrol.service';
import { MatIconRegistry } from '@angular/material/icon';
import { WeatherService } from '../services/weather.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  city = '';

  constructor(
    public iconRegistery: MatIconRegistry,
    public weatherService: WeatherService,
    public SnackbarService: SnackbarcontrolService
  ) {
    this.weatherService = weatherService;
  }

  search() {
    this.weatherService.clear();
    if (this.city == '') {
      this.SnackbarService.openSnackBar('Error: Please enter a city', 'OK');
      return;
    }
    if (this.city.length < 3) {
      this.SnackbarService.openSnackBar(
        'Error: The search term must be at least 3 characters long',
        'OK'
      );
      return;
    }
    this.weatherService.fetchWeather(this.city);
  }
}
