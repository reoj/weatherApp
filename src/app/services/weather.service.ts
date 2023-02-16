import { ErrorServerResponse } from '../models/weatherReport.type';
import { SnackbarcontrolService } from './snackbarcontrol.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuccessfulServerResponse } from '../models/weatherReport.type';
import { Subscription, retry, Subject} from 'rxjs';
import { VisibleError } from '../models/error.type';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherData: SuccessfulServerResponse =
    {} as SuccessfulServerResponse;

  public hasWeather = false;

  public loading = false;
  public isReadyForUpdate = false;

  private baseURL = 'https://wttr.in/';
  private options = '?format=j1';

  private weatherSubject: Subject<Subscription> = new Subject<Subscription>();

  constructor(
    public httpClient: HttpClient,
    public snackBar: SnackbarcontrolService
  ) {
    this.httpClient = httpClient;
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

    this.weatherSubject = new Subject<Subscription>();
    var subscriptionAPI = this.httpClient
      .get<SuccessfulServerResponse>(url)
      .pipe(retry({ count: 3, delay: 1000 }))
      .subscribe(APIResponseObserver);
    this.weatherSubject.next(subscriptionAPI);
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
    var error = { message: message, action: 'OK' } as VisibleError;
    this.snackBar.openSnackBar(error);
    this.hasWeather = false;
    this.setLoadStatus(false);
    this.isReadyForUpdate = false;
    this.weatherSubject.unsubscribe();
  }

  handleResponse(dataFromAPI: SuccessfulServerResponse) {
    const dataFormatIsNotCorrect = this.hasValidData(dataFromAPI);
    if (dataFormatIsNotCorrect) {
      this.weatherData = {} as SuccessfulServerResponse;
      return;
    }
    this.updateServiceWith(dataFromAPI);
  }

  private hasValidData(dataFromAPI: SuccessfulServerResponse) {
    return dataFromAPI.weather == undefined || dataFromAPI.request == undefined;
  }

  private updateServiceWith(data: SuccessfulServerResponse) {
    this.weatherData = data;
    this.hasWeather = true;
    this.setLoadStatus(false);
    this.isReadyForUpdate = true;
  }

  public getUpdateStatus() {
    return this.isReadyForUpdate;
  }
  public checkIfHasWeather() {
    this.hasWeather = this.isReadyForUpdate;
  }

  private setLoadStatus(status: boolean) {
    this.loading = status;
  }

  clear() {
    this.weatherData = {} as SuccessfulServerResponse;
    this.setLoadStatus(false);
    this.isReadyForUpdate = false;
    this.weatherSubject.unsubscribe();
  }
}
