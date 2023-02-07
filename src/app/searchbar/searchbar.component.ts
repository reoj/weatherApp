import { SnackbarcontrolService } from './../services/snackbarcontrol.service';
import { MatIconRegistry } from '@angular/material/icon';
import { WeatherService } from '../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { AutocompleteService } from '../services/autocomplete.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  city = '';
  listOfSuggestions = ['Queretaro'];
  filteredSuggestions: Observable<string[]>;
  searchBar = new FormControl('');

  constructor(
    public WeatherService: WeatherService,
    public SnackbarService: SnackbarcontrolService,
    public Autocomplete: AutocompleteService
  ) {
    this.WeatherService = WeatherService;
    this.filteredSuggestions = new Observable<string[]>();
    this.Autocomplete = Autocomplete;
  }

  ngOnInit(): void {
    this.listOfSuggestions = this.Autocomplete.citiesList;
    this.filteredSuggestions = this.searchBar.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listOfSuggestions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public search(): void {
    this.WeatherService.clear();
    this.city = this.searchBar.value || '';
    var errorMessage = '';
    if (this.city.length < 3) {
      errorMessage = 'Error: Please enter a city with at least 3 characters';
    }
    if (this.city == '') {
      errorMessage = 'Error: Please enter a city';
    }

    if (errorMessage != '') {
      this.SnackbarService.openSnackBar(errorMessage, 'OK');
      return;
    }
    var URIencodedCity = this.Autocomplete.prepareCityString(this.city);
    this.WeatherService.fetchWeather(URIencodedCity);
  }
}
