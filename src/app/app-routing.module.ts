import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FallbackComponent } from './components/fallback/fallback.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () =>
      import('./weather-display/weather-display.module').then(
        (module) => module.WeatherDisplayModule
      ),
  },
  { path: 'fallback', component: FallbackComponent },
  { path: '**', redirectTo: '/fallback' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
