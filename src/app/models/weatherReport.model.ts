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
  }[];
  nearest_area: [
    {
      region: [{ value: string }];
      country: [{ value: string }];
      areaName: [{ value: string }];
    }
  ];
  request: {};
  weather: { [key: string]: Weather };
}

interface Weather {
  hourly: [];
  maxtempC: string;
  mintempC: string;
}
