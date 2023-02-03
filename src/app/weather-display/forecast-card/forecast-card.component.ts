import { Hourly } from './../../models/weatherReport.model';
import { ForecastCardUIModel, HourlyUIModel } from './../../models/ui.model';
import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weatherReport.model';
import { WeatherToIconService } from 'src/app/services/weather-to-icon.service';

@Component({
  selector: 'forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css'],
})
export class ForecastCardComponent implements OnInit {
  @Input() forecast: Weather = {} as Weather;
  @Input() title = 'Today';

  public cardData: ForecastCardUIModel = {} as ForecastCardUIModel;
  public hourlyModels: HourlyUIModel[] = [];

  constructor(public iconService: WeatherToIconService) {}

  ngOnInit(): void {
    this.mapCardHeaderData();
    var hourlyForecasts = this.getHourlyForecasts();
    this.populateGridWithHours(hourlyForecasts);
  }

  private mapCardHeaderData(): void {
    this.mapTemperatureData();
    this.mapDateData();
    this.cardData.uvIndex = this.forecast.uvIndex;
  }
  private getHourlyForecasts(): [Hourly] {
    return this.forecast.hourly;
  }
  private populateGridWithHours(hourlyForecasts: [Hourly]): void {
    for (let hour = 0; hour < hourlyForecasts.length; hour++) {
      this.generateHourlyUIModel(hourlyForecasts[hour]);
    }
    this.fixNightTimeIcon(1);
  }
  private generateHourlyUIModel(singleForecast: Hourly): void {
    var hourlyUIData = this.generateHourlyData(singleForecast);
    this.hourlyModels.push(hourlyUIData);
  }

  private generateHourlyData(singleHourForecast: Hourly): HourlyUIModel {
    var temperatureFromAPI = singleHourForecast.tempC;
    var descriptionFromAPI = singleHourForecast.weatherDesc[0].value;

    var foundIcon = this.iconService.getIcon(descriptionFromAPI);

    var hourFromAPI = singleHourForecast.time;
    var readableHour = this.getLocalHoursFromMilitaryTime(hourFromAPI);

    return new HourlyUIModel(
      readableHour,
      temperatureFromAPI,
      descriptionFromAPI,
      foundIcon
    );
  }

  private fixNightTimeIcon(iconsToFix: number): void {
    for (let iconLast = 0; iconLast < iconsToFix; iconLast++) {
      var position = this.hourlyModels.length - (iconLast + 1);
      var currentIcon = this.hourlyModels[position].icon;
      this.hourlyModels[position].icon =
        this.iconService.makeIconNight(currentIcon);
    }
  }

  private mapTemperatureData(): void {
    this.cardData.maxTemp = this.forecast.maxtempC;
    this.cardData.minTemp = this.forecast.mintempC;
  }

  private mapDateData(): void {
    var dateISO = this.forecast.date;
    this.cardData.date = this.convertIsoDateToLocalformat(dateISO);
  }

  private convertIsoDateToLocalformat(dateISO: string): string {
    var readableDate = this.splitDate(new Date(dateISO));
    return readableDate;
  }

  private splitDate(date: Date): string {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private getLocalHoursFromMilitaryTime(militaryTime: string): string {
    var military = parseInt(militaryTime);
    var hours = Math.floor(military / 100);
    return '' + hours;
  }
}
