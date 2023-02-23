import { WeatherRouterModule } from './weather-display/weather-router.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialUiDependenciesModule } from './shared/material-ui-dependencies.module';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

import { StoreModule } from '@ngrx/store';
import { FallbackComponent } from './components/fallback/fallback.component';

@NgModule({
  declarations: [AppComponent, SearchbarComponent, FallbackComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    ReactiveFormsModule,  
    HttpClientModule,
    MaterialUiDependenciesModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
