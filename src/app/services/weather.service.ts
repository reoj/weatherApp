import { SnackbarcontrolService } from './snackbarcontrol.service';
import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerResponse } from '../models/weatherReport.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public lastResult: ServerResponse = {} as ServerResponse;
  public hasWeather = false;
  public loading = false;
  public isReadyForUpdate = false;

  constructor(
    public client: HttpClient,
    public snackBar: SnackbarcontrolService
  ) {
    this.client = client;
  }

  public getWeather(): ServerResponse {
    return this.lastResult;
  }

  public async fetchWeather(city: string) {
    this.setLoadStatus(true);
    this.isReadyForUpdate = false;

    var encodedCity = city.replaceAll(' ', '+');
    var url = `https://wttr.in/${encodedCity}?format=j1`;

    this.client.get<ServerResponse>(url).subscribe({
      next: (data: ServerResponse) => {
        this.handleResponse(data);
      },
      error: (err) => {
        var message = 'Error fetching weather data:' + err.message;
        if (err.status == 404) {
          message = 'City not found';
        }

        this.snackBar.openSnackBar(message, 'OK');
        this.setLoadStatus(false);
        this.isReadyForUpdate = false;
      },
    });
  }

  handleResponse(data: ServerResponse) {
    if (data.weather == undefined) {
      this.lastResult = {} as ServerResponse;
      return;
    }
    //console.log(data);
    this.lastResult = data;
    this.checkForWeather();
    this.setLoadStatus(false);
    this.isReadyForUpdate = true;
  }

  public checkForWeather() {
    this.hasWeather = this.lastResult.nearest_area != undefined;
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
    this.lastResult = {} as ServerResponse;
    this.hasWeather = false;
    this.setLoadStatus(false);
    this.isReadyForUpdate = false;
  }
}
