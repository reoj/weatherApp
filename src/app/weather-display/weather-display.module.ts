import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { WeatherDisplayComponent } from './display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastCardComponent } from '../components/forecast-card/forecast-card.component';
import { CurrentConditionCardComponent } from '../components/current-condition-card/current-condition-card.component';
import { AppRoutingModule } from '../app-routing.module';
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { TwentyFourHourPipe } from '../pipes/twentyfour-hours.pipe';
import { WeatherComponent } from './weather/weather.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MoonDisplayComponent } from '../components/moon-display/moon-display.component';
import { MakeBoldDirective } from '../directives/make-bold.directive';

@NgModule({
  declarations: [
    WeatherDisplayComponent,
    ForecastCardComponent,
    CurrentConditionCardComponent,
    TemperaturePipe,
    TwentyFourHourPipe,
    WeatherComponent,
    MoonDisplayComponent,
    MakeBoldDirective
  ],
  exports: [WeatherDisplayComponent, MoonDisplayComponent],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    AppRoutingModule,
    CommonModule,
    MatButtonToggleModule,
    FormsModule
  ],
})
export class WeatherDisplayModule {}
