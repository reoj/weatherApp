import { CurrentConditionUIModel } from './../models/ui.model';
import { CurrentConditionData, Weather } from 'src/app/models/weatherReport.model';
import { MatIconRegistry } from '@angular/material/icon';
import { SnackbarcontrolService } from '../services/snackbarcontrol.service';
import { ServerResponse, Area } from './../models/weatherReport.model';
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
  conditionNow = new CurrentConditionUIModel();
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
    if (this.updateHasBeenCalled()) {      
      this.updateDisplay();
    }
  }
  private updateHasBeenCalled() {
    return this.isReadyForUpdate != this.weatherService.isReadyForUpdate;
  }

  updateDisplay() {
    this.isReadyForUpdate = this.weatherService.isReadyForUpdate;
    this.weatherData = this.weatherService.getWeather();
    if (this.weatherService.isReadyForUpdate) {
      this.mapData();
      var descriptionForIcon = this.conditionNow.description;
      this.conditionNow.icon = this.wtiService.getIcon(descriptionForIcon);
    }
  }

  mapData() {
    var recievedArea = this.weatherData.nearest_area[0];
    this.mapAreaData(recievedArea);

    var recievedCondition = this.weatherData.current_condition[0];
    this.mapConditionData(recievedCondition);

    var recievedWeather = this.weatherData.weather[0];
    this.mapWeatherData(recievedWeather);

    this.forecast = this.weatherData.weather;
  }

  mapAreaData(recievedArea: Area) {
    var recievedCity = recievedArea.areaName[0].value;
    this.conditionNow.city = recievedCity;

    var recievedStation = recievedArea.region[0].value;
    this.conditionNow.station = recievedStation;
    
    var recievedCountry = recievedArea.country[0].value;
    this.conditionNow.country = recievedCountry;
  }

  mapConditionData(recievedCondition: CurrentConditionData) {
    this.conditionNow.currentTemp = recievedCondition.temp_C;
    this.conditionNow.feelsLike = recievedCondition.FeelsLikeC;

    this.conditionNow.humidity = recievedCondition.humidity;
    this.conditionNow.pressure = recievedCondition.pressure;
    
    this.conditionNow.windDirection = recievedCondition.winddir16Point;
    this.conditionNow.windSpeed = recievedCondition.windspeedKmph;

    this.conditionNow.precipitationLevel = recievedCondition.precipMM;
    this.conditionNow.uvIndex = recievedCondition.uvIndex;
    this.conditionNow.visibility = recievedCondition.visibility;

    var recievedDescription = recievedCondition.weatherDesc[0].value;
    this.conditionNow.description = recievedDescription;
  }
  mapWeatherData(recievedWeather: Weather) {
    this.conditionNow.maxTemp = recievedWeather.maxtempC;
    this.conditionNow.minTemp = recievedWeather.mintempC;
  }
}
