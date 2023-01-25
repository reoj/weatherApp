import { TestBed } from '@angular/core/testing';

import { WeatherToIconService } from './weather-to-icon.service';

describe('WeatherToIconService', () => {
  let service: WeatherToIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherToIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
