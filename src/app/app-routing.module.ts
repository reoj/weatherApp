import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoonDisplayComponent } from './moon-display/moon-display.component';

const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherDisplayComponent },
  { path: 'moon', component: MoonDisplayComponent },
  { path: '**', redirectTo: '/weather' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
