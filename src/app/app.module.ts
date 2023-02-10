import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { WeatherDisplayModule } from './weather-display/weather-display.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialUiDependenciesModule } from './material-ui-dependencies/material-ui-dependencies.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

import { MoonDisplayComponent } from './moon-display/moon-display.component';

@NgModule({
  declarations: [AppComponent, SearchbarComponent, MoonDisplayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    WeatherDisplayModule,
    AppRoutingModule,
    MaterialUiDependenciesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
