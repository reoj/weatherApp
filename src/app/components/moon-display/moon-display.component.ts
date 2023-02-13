import { WeatherService } from '../../services/weather.service';
import { Astronomy } from '../../models/weatherReport.type';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoonPhaseUIModel } from 'src/app/models/ui.type';
import { MoonToIconService } from 'src/app/services/moon-to-icon.service';

@Component({
  selector: 'app-moon-display',
  templateUrl: './moon-display.component.html',
  styleUrls: ['./moon-display.component.css'],
  host: {
    class: 'parent-container',
  },
})
export class MoonDisplayComponent implements OnDestroy, OnInit {
  moonPhases = [] as MoonPhaseUIModel[];
  public service: WeatherService;
  public dates = [] as String[];

  constructor(
    public WeatherService: WeatherService,
    private moonIconService: MoonToIconService
  ) {
    this.service = WeatherService;
  }
  ngOnInit(): void {
    this.setDates();
    if (this.service.hasWeather) {
      this.updateMoonDisplay();
    }
  }
  ngOnDestroy(): void {
    this.service.checkIfHasWeather();
  }

  updateMoonDisplay() {
    var fullData = this.service.getLastValidWeather().weather;
    var newArrayOfMoonPhases = [] as MoonPhaseUIModel[];

    fullData.forEach((day) => {
      var astronomical: Astronomy = day.astronomy[0];
      var locator = fullData.indexOf(day);
      newArrayOfMoonPhases.push({ data: astronomical, index: locator });
    });

    this.moonPhases = newArrayOfMoonPhases;
  }

  setDates() {
    this.dates = ['Today', 'Tomorrow', 'In 2 Days'];
  }

  getMoonPhaseIcon(phaseName: string) {
    var retrievedIcon = this.moonIconService.getMoonPhaseIcon(phaseName);
    var returnClass = `nf ${retrievedIcon}`;
    return returnClass;
  }
}
