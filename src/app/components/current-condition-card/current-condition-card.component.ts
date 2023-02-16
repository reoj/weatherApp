import { CurrentConditionUIModel } from 'src/app/models/ui.type';
import { Component, Input, OnChanges } from '@angular/core';
import {
  Area,
  CurrentConditionData,
  SuccessfulServerResponse,
  Weather,
} from 'src/app/models/weatherReport.type';
import { WeatherToIconService } from 'src/app/services/weather-to-icon.service';

@Component({
  selector: 'current-condition-card',
  templateUrl: './current-condition-card.component.html',
  styleUrls: ['./current-condition-card.component.css'],
})
export class CurrentConditionCardComponent implements OnChanges {
  @Input() weatherData = {} as SuccessfulServerResponse;
  condition = new CurrentConditionUIModel();

  constructor(private WTIService: WeatherToIconService) {}

  ngOnChanges(): void {
    this.mapData();
  }

  private mapData(): void {
    var recievedArea = this.weatherData.nearest_area[0];
    this.mapAreaData(recievedArea);

    var recievedCondition = this.weatherData.current_condition[0];
    this.mapConditionData(recievedCondition);

    var recievedWeather = this.weatherData.weather[0];
    this.mapWeatherData(recievedWeather);
    
    var descriptionForIcon = this.condition.description;
    this.condition.icon = this.WTIService.getIcon(descriptionForIcon);
  }

  private mapAreaData(recievedArea: Area): void {
    var recievedCity = recievedArea.areaName[0].value;
    this.condition.city = recievedCity;

    var recievedStation = recievedArea.region[0].value;
    this.condition.station = recievedStation;

    var recievedCountry = recievedArea.country[0].value;
    this.condition.country = recievedCountry;
  }

  private mapConditionData(recievedCondition: CurrentConditionData): void {
    this.condition.currentTemp = recievedCondition.temp_C;
    this.condition.feelsLike = recievedCondition.FeelsLikeC;

    this.condition.humidity = recievedCondition.humidity;
    this.condition.pressure = recievedCondition.pressure;

    this.condition.windDirection = recievedCondition.winddir16Point;
    this.condition.windSpeed = recievedCondition.windspeedKmph;

    this.condition.precipitationLevel = recievedCondition.precipMM;
    this.condition.uvIndex = recievedCondition.uvIndex;
    this.condition.visibility = recievedCondition.visibility;

    var recievedDescription = recievedCondition.weatherDesc[0].value;
    this.condition.description = recievedDescription;
  }
  private mapWeatherData(recievedWeather: Weather): void {
    this.condition.maxTemp = recievedWeather.maxtempC;
    this.condition.minTemp = recievedWeather.mintempC;
  }
}
