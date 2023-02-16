import { Astronomy } from "./weatherReport.type";

export class HourlyUIModel {
  time: string = '0';
  description: string = 'clear';
  icon: string = 'sunny';
  temperature: string = '0';

  constructor(
    time: string,
    temperature: string,
    description: string,
    icon: string
  ) {
    this.time = time;
    this.temperature = temperature;
    this.description = description;
    this.icon = icon;
  }
}

export class CurrentConditionUIModel {
  city = 'City';
  country = 'Country';
  station = 'Station';
  description = 'Partly Cloudy';
  icon = 'partly_cloudy_day';
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
  precipitationLevel = '0';
}

export class ForecastCardUIModel {
  date: string = '';
  uvIndex: string = '';
  maxTemp: string = '';
  minTemp: string = '';
}

export interface MoonPhaseUIModel {
  data: Astronomy;
  index: number;
}
