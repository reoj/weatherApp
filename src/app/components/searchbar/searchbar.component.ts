import { MatAutocomplete } from '@angular/material/autocomplete';
import { SnackbarcontrolService } from 'src/app/services/snackbarcontrol.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AutocompleteService } from 'src/app/services/autocomplete.service';
import { Observable, map, startWith, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { VisibleError } from 'src/app/models/error.type';
import { Router } from '@angular/router';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  city = '';
  listOfSuggestions = ['Queretaro, Queretaro'];
  filteredSuggestions: Observable<string[]>;
  searchBar = new FormControl('');
  @ViewChild('auto') autoCompleteControl: MatAutocomplete =
    {} as MatAutocomplete;

  constructor(
    public weatherService: WeatherService,
    public SnackbarService: SnackbarcontrolService,
    public AutocompleteService: AutocompleteService,
    private routerControl: Router
  ) {
    this.weatherService = weatherService;
    this.filteredSuggestions = new Observable<string[]>();
    this.AutocompleteService = AutocompleteService;
  }

  ngOnInit(): void {
    this.city = '';
    this.listOfSuggestions = this.AutocompleteService.citiesList;
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
    this.weatherService.clear();
    this.city = this.searchBar.value || '';

    var errorMessage = this.checkCityValueForErrors();
    var anErrorWasFound = errorMessage != '';

    if (anErrorWasFound) {
      this.SnackbarService.openSnackBar(new VisibleError(errorMessage, 'OK'));
      return;
    }
    this.autoCompleteControl.showPanel = false;
    var URIencodedCity = this.AutocompleteService.prepareCityString(this.city);
    this.weatherService.fetchWeather(URIencodedCity);
    this.recuperateIfRouteIsFallback();
  }

  private checkCityValueForErrors() {
    var errorMessage = '';
    if (this.city.length < 3) {
      errorMessage = 'Error: Please enter a city with at least 3 characters';
    }
    if (this.city == '') {
      errorMessage = 'Error: Please enter a city';
    }
    return errorMessage;
  }
  public recuperateIfRouteIsFallback() {
    if (this.routerControl.url != '/main/weather' && this.routerControl.url != '/main/moon') {
      this.routerControl.navigate(['/main/weather']);
    }
  }

}
