import { Injectable } from '@angular/core';

@Injectable()
export class MoonToIconService {

  constructor() { }

  getMoonPhaseIcon(phaseName: string) {
    switch (phaseName) {
      case 'New Moon':
        return 'nf-md-moon_new';
      case 'Waxing Crescent':
        return 'nf-md-moon_waxing_crescent';
      case 'First Quarter':
        return 'nf-md-moon_first_quarter';
      case 'Waxing Gibbous':
        return 'nf-md-moon_waxing_gibbous';
      case 'Full Moon':
        return 'nf-md-moon_full';
      case 'Waning Gibbous':
        return 'nf-md-moon_waning_gibbous';
      case 'Last Quarter':
        return 'nf-md-moon_last_quarter';
      case 'Waning Crescent':
        return 'nf-md-moon_waning_crescent';
      default:
        return 'nf-md-moon_new';
    }
  }
}
