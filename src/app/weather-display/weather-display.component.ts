import { Weather } from 'src/app/models/weatherReport.model';
import { MatIconRegistry } from '@angular/material/icon';
import { SnackbarcontrolService } from '../services/snackbarcontrol.service';
import { ServerResponse } from './../models/weatherReport.model';
import { WeatherService } from './../services/weather.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { WeatherToIconService } from '../services/weather-to-icon.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css'],
})
export class WeatherDisplayComponent implements OnInit, DoCheck {
  isReadyForUpdate: boolean = false;

  weatherData: ServerResponse = {} as ServerResponse;
  city = 'City';
  country = 'Country';
  station = 'Station';
  description = 'Description';
  iconNow = 'partly_cloudy_day';
  iconToday = 'cloudy';
  iconTomorrow = 'sunny';
  currentTemp = '0';
  feelsLike = '0';
  humidity = '0';
  pressure = '0';
  visibility = '0';
  uvIndex = '0';
  windDirection = 'XXX';
  windSpeed = '0';
  maxTemp = '0';
  minTemp = '0';
  precip = '0';
  forecast = [] as Weather[];

  constructor(
    public weatherService: WeatherService,
    public snackbarService: SnackbarcontrolService,
    public iconRegistery: MatIconRegistry,
    private wtiService: WeatherToIconService
  ) {
    this.weatherService = weatherService;
    this.isReadyForUpdate = this.weatherService.isReadyForUpdate;
  }

  ngOnInit(): void {
    this.updateDisplay();
  }
  ngDoCheck(): void {
    if (this.isReadyForUpdate != this.weatherService.isReadyForUpdate) {
      this.isReadyForUpdate = this.weatherService.isReadyForUpdate;
      this.updateDisplay();
    }
  }
  updateDisplay() {
    this.weatherData = this.weatherService.getWeather();
    if (this.weatherService.isReadyForUpdate) {
      this.mapData();
      this.iconNow = this.wtiService.getIcon(this.description);
    }
  }

  mapData() {
    this.city = this.weatherData.nearest_area[0].region[0].value;
    this.station = this.weatherData.nearest_area[0].areaName[0].value;
    this.country = this.weatherData.nearest_area[0].country[0].value;
    this.description =
      this.weatherData.current_condition[0].weatherDesc[0].value;
    this.currentTemp = this.weatherData.current_condition[0].temp_C;
    this.feelsLike = this.weatherData.current_condition[0].FeelsLikeC;
    this.humidity = this.weatherData.current_condition[0].humidity;
    this.pressure = this.weatherData.current_condition[0].pressure;
    this.visibility = this.weatherData.current_condition[0].visibility;
    this.uvIndex = this.weatherData.current_condition[0].uvIndex;
    this.windDirection = this.weatherData.current_condition[0].winddir16Point;
    this.windSpeed = this.weatherData.current_condition[0].windspeedKmph;
    this.maxTemp = this.weatherData.weather[0].maxtempC;
    this.minTemp = this.weatherData.weather[0].mintempC;
    this.precip = this.weatherData.current_condition[0].precipMM;
    this.forecast = this.weatherData.weather;
  }
}
