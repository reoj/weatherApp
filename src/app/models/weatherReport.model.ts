export interface ServerResponse {
  current_condition: {
    temp_C: string;
    weatherDesc: [{ value: string }];
    FeelsLikeC: string;
    humidity: string;
    pressure: string;
    visibility: string;
    uvIndex: string;
    winddir16Point: string;
    windspeedKmph: string;
    precipMM: string;
  }[];
  nearest_area: [
    {
      region: [{ value: string }];
      country: [{ value: string }];
      areaName: [{ value: string }];
    }
  ];
  request: {};
  weather: [Weather];
}

export interface Weather {
  hourly: [
    {
      weatherDesc: [{ value: string }];
      tempC: string;
      time: string;
    }
  ];
  maxtempC: string;
  mintempC: string;
  date: string;
  avgtempC: string;
  uvIndex: string;
}
