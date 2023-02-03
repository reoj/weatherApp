export interface ServerResponse {
  current_condition: CurrentConditionData[];
  nearest_area: Area[];
  request: {};
  weather: [Weather];
}

export interface Area {
  region: [{ value: string }];
  country: [{ value: string }];
  areaName: [{ value: string }];
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

export interface Weather {
  hourly: [Hourly];
  maxtempC: string;
  mintempC: string;
  date: string;
  avgtempC: string;
  uvIndex: string;
}

export interface Hourly {
  weatherDesc: [{ value: string }];
  tempC: string;
  time: string;
}