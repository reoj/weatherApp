export interface SuccessfulServerResponse {
  current_condition: CurrentConditionData[];
  nearest_area: Area[];
  request: {};
  weather: [Weather];
}

export interface ErrorServerResponse {
  status: Number;
  message: string;
  name: string;
  ok: boolean;
  statusText: string;
  url: string;
}
export interface CurrentConditionData {
  temp_C: string;
  FeelsLikeC: string;
  humidity: string;
  pressure: string;
  visibility: string;
  uvIndex: string;
  winddir16Point: string;
  windspeedKmph: string;
  precipMM: string;
  weatherDesc: [{ value: string }];
}

export interface Area {
  region: [{ value: string }];
  country: [{ value: string }];
  areaName: [{ value: string }];
}

export interface Weather {
  hourly: [Hourly];
  maxtempC: string;
  mintempC: string;
  date: string;
  avgtempC: string;
  uvIndex: string;
  astronomy: Astronomy[];
}

export interface Hourly {
  weatherDesc: [{ value: string }];
  tempC: string;
  time: string;
}

export class Astronomy {
  moonrise: string = '00:00';
  moonset: string = '00:00';
  moon_phase: string = 'Phase';
  moon_illumination: string = '0';
  sunrise: string = '00:00';
  sunset: string = '00:00';
}
