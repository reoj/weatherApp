import { iconNames } from '../models/mock-icons';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherToIconService {
  matches: { weather: string; icon: string }[] = [];
  constructor() {
    this.matches = iconNames;
  }

  public getIcon(weatherInput: string): string {
    weatherInput = weatherInput.replace('Patchy', '');
    var arrayOfPossibleNames = weatherInput.toLowerCase().split(',');
    var finder = new IconMatchFinder(arrayOfPossibleNames);
    return finder.findMatch();
  }
  public makeIconNight(icon: string): string {
    switch (icon) {
      case 'sunny':
        return 'nightlight';
      case 'clear':
        return 'clear_night';
      case 'partly_cloudy_day':
        return 'nights_stay';
      case 'sunny_snowing':
        return 'snowing';
      default:
        return icon;
    }
  }
}

class IconMatchFinder {
  private icon = 'sunny';
  private matches = iconNames;
  public foundMatch = undefined as
    | { weather: string; icon: string }
    | undefined;
  public possibleMatches: string[];

  constructor(possibleMatches: string[]) {
    this.possibleMatches = possibleMatches;
  }

  public findMatch(): string {
    var counter = 0;

    while (
      this.hasNotFoundAMatch() &&
      this.hasNotCheckedAllPossibilities(counter)
    ) {
      var currentSearch = this.possibleMatches[counter].trim();
      this.saveSearchResult(currentSearch);
      counter++;
    }
    this.updateIcon();
    return this.icon;
  }

  private updateIcon() {
    if (this.foundMatch !== undefined) {
      this.icon = this.foundMatch.icon;
    }
  }

  private saveSearchResult(currentSearch: string) {
    this.foundMatch = this.matches.find(
      (iconMatch) => iconMatch.weather.toLowerCase() === currentSearch
    );
  }

  private hasNotCheckedAllPossibilities(counter: number) {
    return counter < this.possibleMatches.length;
  }

  private hasNotFoundAMatch() {
    return this.foundMatch === undefined;
  }
}
