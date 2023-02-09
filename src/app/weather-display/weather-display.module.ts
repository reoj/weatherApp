import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { WeatherDisplayComponent } from './weather-display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { CurrentConditionCardComponent } from './current-condition-card/current-condition-card.component';

@NgModule({
  declarations: [WeatherDisplayComponent, ForecastCardComponent, CurrentConditionCardComponent],
  exports: [WeatherDisplayComponent],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    CommonModule
  ]
})
export class WeatherDisplayModule { }
