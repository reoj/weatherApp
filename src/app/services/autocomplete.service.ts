import { Injectable } from '@angular/core';
import cityNameList from '../models/mock-cities';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  public citiesList = cityNameList.sort();
  constructor() {}

  public prepareCityString(city: string): string {
    var words = city.replace(',', '').split(' ');
    words.forEach((word) => {
      word = encodeURIComponent(word);
    });
    return words.join('+');
  }
}
