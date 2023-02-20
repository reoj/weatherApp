import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ForecastCardComponent } from '../components/forecast-card/forecast-card.component';
import { MoonDisplayComponent } from '../components/moon-display/moon-display.component';
import { WeatherDisplayComponent } from './display.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrentConditionCardComponent } from '../components/current-condition-card/current-condition-card.component';

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
    DataStripDirective
  ],
  exports: [WeatherDisplayComponent, MoonDisplayComponent],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    MatButtonToggleModule,
    FormsModule,

  ],
})
export class WeatherDisplayModule {}
