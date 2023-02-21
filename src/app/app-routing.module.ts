import { WeatherDisplayComponent } from './weather-display/display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoonDisplayComponent } from './components/moon-display/moon-display.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FallbackComponent } from './components/fallback/fallback.component';

const routes: Routes = [
  {
    path: 'main',
    component: WeatherDisplayComponent,
    children: [
      { path: 'weather', component: WeatherComponent },
      { path: 'moon', component: MoonDisplayComponent },
    ],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'fallback' , component: FallbackComponent},
  { path: '**', redirectTo: '/fallback' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
