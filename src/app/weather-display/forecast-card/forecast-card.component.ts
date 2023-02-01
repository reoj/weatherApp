import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weatherReport.model';
import { WeatherToIconService } from 'src/app/services/weather-to-icon.service';

@Component({
  selector: 'forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css'],
})
export class ForecastCardComponent implements OnInit {
  constructor(public iconService: WeatherToIconService) {}
  date = '';
  uvIndex = '';
  maxTemp: string = '';
  minTemp: string = '';
  hourlyModels: {
    time: string;
    description: string;
    icon: string;
    temperature: string;
  }[] = [];

  @Input() forecast: Weather = {} as Weather;
  @Input() title = 'Today';

  ngOnInit(): void {
    this.mapGeneralData();
    var hours = this.forecast.hourly;
    for (let i = 0; i < hours.length; i++) {
      var description = hours[i].weatherDesc[0].value;
      var hour = this.convertMilitaryTimeToHours(hours[i].time);
      var foundIcon = this.iconService.getIcon(description);
      var temperature = hours[i].tempC;
      this.hourlyModels.push({
        time: hour,
        description: description,
        icon: foundIcon,
        temperature: temperature,
      });
    }
  }

  mapGeneralData (){
    this.maxTemp = this.forecast.maxtempC;
    this.minTemp = this.forecast.mintempC;
    this.uvIndex = this.forecast.uvIndex;
    this.date = this.forecast.date;
  }
  convertMilitaryTimeToHours(militaryTime: string) {
    var military = parseInt(militaryTime);
    var hours = Math.floor(military / 100);
    return '' + hours;
  }

  displayResult() {
    throw new Error('Function not implemented.');
  }
}
