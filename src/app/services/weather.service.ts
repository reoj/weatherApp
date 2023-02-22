import { ErrorServerResponse } from '../models/weatherReport.type';
import { SnackbarcontrolService } from './snackbarcontrol.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SuccessfulServerResponse } from '../models/weatherReport.type';
import { Subscription, retry, Subject, tap, startWith } from 'rxjs';
import { VisibleError } from '../models/error.type';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherData: SuccessfulServerResponse =
    {} as SuccessfulServerResponse;

  public hasWeather = false;

  public loading = false;
  public isReadyForUpdate = new Subject<boolean>();

  private baseURL = 'https://wttr.in/';

  private weatherSubject: Subscription = new Subscription();

  private DEBUG_MODE = true;

  constructor(
    public httpClient: HttpClient,
    public snackBar: SnackbarcontrolService
  ) {
    this.httpClient = httpClient;
    if (this.DEBUG_MODE && localStorage.getItem('weatherData') != null) {
      this.weatherData = JSON.parse(localStorage.getItem('weatherData') || '');
      this.hasWeather = true;
    }
  }

  public getLastValidWeather(): SuccessfulServerResponse {
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

    this.weatherSubject = this.httpClient
      .get<SuccessfulServerResponse>(url, {
        params: new HttpParams().append('format', 'j1'),
      })
      .pipe(retry({ count: 3, delay: 1000 }))
      .subscribe(APIResponseObserver);
  }

  private reloadService() {
    this.clear();
    this.setLoadStatus(true);
  }

  private buildCityURL(city: string) {
    var encodedCity = city.replaceAll(' ', '+');
    var url = this.baseURL + `${encodedCity}`;
    return url;
  }

  private generateRelevantMessage(exception: ErrorServerResponse): string {
    var message = 'Error fetching weather data:' + exception.message;
    if (exception.status == null) {
      message = 'Weather API is not responding';
    }
    if (exception.status == 404) {
      message = 'City not found';
    }
    return message;
  }

  private endWithError(message: string) {
    var error = { message: message, action: 'OK' } as VisibleError;
    this.snackBar.openSnackBar(error);
    this.hasWeather = false;
    this.setLoadStatus(false);
    this.isReadyForUpdate.next(false);
    this.weatherSubject.unsubscribe();
  }

  handleResponse(dataFromAPI: SuccessfulServerResponse) {
    const dataFormatIsNotCorrect = this.hasInvalidData(dataFromAPI);
    if (dataFormatIsNotCorrect) {
      this.weatherData = {} as SuccessfulServerResponse;
      return;
    }
    this.updateServiceWith(dataFromAPI);
  }

  private hasInvalidData(dataFromAPI: SuccessfulServerResponse) {
    return dataFromAPI.weather == undefined || dataFromAPI.request == undefined;
  }

  private updateServiceWith(data: SuccessfulServerResponse) {
    this.weatherData = data;
    this.hasWeather = true;
    this.setLoadStatus(false);
    this.isReadyForUpdate.next(true);
    localStorage.setItem('weatherData', JSON.stringify(this.weatherData));
  }

  public getUpdateStatus() {
    return this.isReadyForUpdate;
  }
  public checkIfHasWeather() {
    this.isReadyForUpdate.subscribe((value) => {
      this.hasWeather = value;
    });
  }

  private setLoadStatus(status: boolean) {
    this.loading = status;
  }

  clear() {
    this.weatherData = {} as SuccessfulServerResponse;
    this.setLoadStatus(false);
    this.isReadyForUpdate.next(false);
    this.weatherSubject.unsubscribe();
  }
}
