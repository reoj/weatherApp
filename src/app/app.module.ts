import { MatCardModule } from '@angular/material/card';
import { WeatherDisplayModule } from './weather-display/weather-display.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchbarComponent } from './searchbar/searchbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, SearchbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,       
    FormsModule,    
    LayoutModule,
    MatInputModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,    
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    WeatherDisplayModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
