import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';

import { MaterialUiDependenciesModule } from '../shared/material-ui-dependencies.module';

import { ForecastCardComponent } from '../components/forecast-card/forecast-card.component';
import { WeatherDisplayComponent } from './display.component';
import { WeatherComponent } from '../components/weather/weather.component';
import { CurrentConditionCardComponent } from '../components/current-condition-card/current-condition-card.component';

import { FormsModule } from '@angular/forms';
import { MoonDisplayComponent } from '../components/moon-display/moon-display.component';

import { TemperaturePipe } from '../pipes/temperature.pipe';
import { TwentyFourHourPipe } from '../pipes/twentyfour-hours.pipe';

import { MakeBoldDirective } from '../directives/make-bold.directive';
import { DataStripDirective } from '../directives/data-strip.directive';

@NgModule({
  declarations: [
    WeatherDisplayComponent,
    ForecastCardComponent,
    CurrentConditionCardComponent,
    TemperaturePipe,
    TwentyFourHourPipe,
    WeatherComponent,
    MoonDisplayComponent,
    MakeBoldDirective,
    DataStripDirective,
  ],
  exports: [WeatherDisplayComponent, MoonDisplayComponent],
  imports: [
    MaterialUiDependenciesModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
  ],
})
export class WeatherDisplayModule {}
