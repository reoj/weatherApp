import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { WeatherDisplayComponent } from './display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { CurrentConditionCardComponent } from './current-condition-card/current-condition-card.component';
import { AppRoutingModule } from '../app-routing.module';
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { TwentyFourHourPipe } from '../pipes/twentyfour-hours.pipe';
import { WeatherComponent } from './weather/weather.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    WeatherDisplayComponent,
    ForecastCardComponent,
    CurrentConditionCardComponent,
    TemperaturePipe,
    TwentyFourHourPipe,
    WeatherComponent
  ],
  exports: [WeatherDisplayComponent],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    AppRoutingModule,
    CommonModule,
    MatButtonToggleModule
  ],
})
export class WeatherDisplayModule {}
