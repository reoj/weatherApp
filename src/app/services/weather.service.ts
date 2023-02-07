import { ErrorServerResponse } from './../models/weatherReport.model';
import { SnackbarcontrolService } from './snackbarcontrol.service';
import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuccessfulServerResponse } from '../models/weatherReport.model';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public weatherData: SuccessfulServerResponse = {} as SuccessfulServerResponse;

  public hasWeather = false;
  public loading = false;
  public isReadyForUpdate = false;

  private baseURL = 'https://wttr.in/';
  private options = '?format=j1';

  constructor(
    public httpClient: HttpClient,
    public snackBar: SnackbarcontrolService
  ) {
    this.httpClient = httpClient;
  }

  public getWeather(): SuccessfulServerResponse {
    return this.weatherData;
  }

  public async fetchWeather(city: string) {
    this.reloadService();

    var url = this.buildCityURL(city);

    const APIResponseObserver = {
      next: (data: SuccessfulServerResponse): void => {
        this.handleResponse(data);
      },
      error: (exception: ErrorServerResponse): void => {
        var message = this.generateRelevantMessage(exception);
        this.endWithError(message);
      },
    };

    this.httpClient
      .get<SuccessfulServerResponse>(url)
      .pipe(retry(3))
      .subscribe(APIResponseObserver);
  }

  private reloadService() {
    this.clear();
    this.setLoadStatus(true);
  }

  private buildCityURL(city: string) {
    var encodedCity = city.replaceAll(' ', '+');
    var url = this.baseURL + `${encodedCity}` + this.options;
    return url;
  }

  private generateRelevantMessage(exception: ErrorServerResponse): string {
    var message = 'Error fetching weather data:' + exception.message;
    if (exception.status == 404) {
      message = 'City not found';
    }
    return message;
  }

  private endWithError(message: string) {
    this.snackBar.openSnackBar(message, 'OK');
    this.setLoadStatus(false);
    this.isReadyForUpdate = false;
  }

  handleResponse(dataFromAPI: SuccessfulServerResponse) {
    const dataFormatIsNotCorrect = this.checkDataHeaders(dataFromAPI);
    if (dataFormatIsNotCorrect) {
      this.weatherData = {} as SuccessfulServerResponse;
      return;
    }
    this.updateServiceWith(dataFromAPI);
  }

  private checkDataHeaders(dataFromAPI: SuccessfulServerResponse) {
    return dataFromAPI.weather == undefined || dataFromAPI.request == undefined;
  }

  private updateServiceWith(data: SuccessfulServerResponse) {
    this.weatherData = data;
    this.checkForWeather();
    this.setLoadStatus(false);
    this.isReadyForUpdate = true;
  }

  public checkForWeather() {
    this.hasWeather = this.weatherData.nearest_area != undefined;
  }
  public getWeatherAvailable() {
    return this.hasWeather;
  }

  public getUpdateStatus() {
    return this.isReadyForUpdate;
  }

  private setLoadStatus(status: boolean) {
    this.loading = status;
  }

  clear() {
    this.weatherData = {} as SuccessfulServerResponse;
    this.hasWeather = false;
    this.setLoadStatus(false);
    this.isReadyForUpdate = false;
  }
}
