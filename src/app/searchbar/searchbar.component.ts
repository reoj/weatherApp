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
    public iconRegistery: MatIconRegistry,
    public weatherService: WeatherService,
    public SnackbarService: SnackbarcontrolService,
    public autocomplete: AutocompleteService
  ) {
    this.weatherService = weatherService;
    this.filteredSuggestions = new Observable<string[]>();
    this.autocomplete = autocomplete;
  }

  ngOnInit(): void {
    this.listOfSuggestions = this.autocomplete.citiesList;
    this.filteredSuggestions = this.searchBar.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listOfSuggestions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  search() {
    this.weatherService.clear();
    this.city = this.searchBar.value || '';
    if (this.city == '') {
      this.SnackbarService.openSnackBar('Error: Please enter a city', 'OK');
      return;
    }
    if (this.city.length < 3) {
      this.SnackbarService.openSnackBar(
        'Error: The search term must be at least 3 characters long',
        'OK'
      );
      return;
    }
    var URIencodedCity = this.autocomplete.prepareCityString(this.city);
    this.weatherService.fetchWeather(URIencodedCity);
  }
}
