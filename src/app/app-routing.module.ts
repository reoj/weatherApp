import { WeatherDisplayComponent } from './weather-display/display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoonDisplayComponent } from './moon-display/moon-display.component';
import { WeatherComponent } from './weather-display/weather/weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent },
  { path: 'moon', component: MoonDisplayComponent },
  { path: '**', redirectTo: '/weather' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
