import { MoonDisplayComponent } from './../components/moon-display/moon-display.component';
import { WeatherComponent } from './../components/weather/weather.component';
import { WeatherDisplayComponent } from './display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WeatherDisplayComponent,
    children: [
      { path: 'weather', component: WeatherComponent },
      { path: 'moon', component: MoonDisplayComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRouterModule {}
