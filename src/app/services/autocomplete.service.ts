import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  public citiesList = [
    'Queretaro, Queretaro',
    'Mexico City, Mexico',
    'Guadalajara, Jalisco',
    'Monterrey, Nuevo Leon',
    'Puebla, Puebla',
    'Tijuana, Baja California',
    'Ciudad Juárez, Chihuahua',
    'London, England',
    'Paris, France',
    'Madrid, Spain',
    'Berlin, Germany',
    'Rome, Italy',
    'Barcelona, Spain',
    'Buenos Aires, Argentina',
    'Los Angeles, California',
    'Hermitage, Pennsylvania',
    'New York, New York',
    'Chicago, Illinois',
    'Houston, Texas',
    'Phoenix, Arizona',
    'Philadelphia, Pennsylvania',
    'San Antonio, Texas',
    'Lucedale, Mississippi',
    'Mobile, Alabama',
    'Miami, Florida',
    'Luxembourg, Luxembourg',
    'Las Vegas, Nevada',
    'San Diego, California',
    'Dallas, Texas',
    'Capetown, South Africa',
    'Sydney, Australia',
    'Melbourne, Australia',
    'Tokyo, Japan',
    'Osaka, Japan',
    'Kyoto, Japan',
    'Moscow, Russia',
    'Saint Petersburg, Russia',
    'Kiev, Ukraine',
    'Minsk, Belarus',
    'Beijing, China',
    'Shanghai, China',
    'Hong Kong, China',
    'Bangkok, Thailand',
    'Singapore, Singapore',
    'Seoul, South Korea',
    'New Delhi, India',
    'Mumbai, India',
    'Kolkata, India',
    'Jakarta, Indonesia',
    'Manila, Philippines',
    'Lima, Peru',
    'Bogotá, Colombia',
    'Caracas, Venezuela',
    'Santiago, Chile',
    'Lisbon, Portugal',
  ];
  constructor() {}

  public prepareCityString(city: string) {
    var words = city.replace(',', '').split(' ');
    words.forEach((word) => {
      word = encodeURIComponent(word);
    });
    return words.join('+');
  }
}
