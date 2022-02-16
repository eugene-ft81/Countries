import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countriesBaseUrl: string = 'http://api.countrylayer.com/v2/';
  private apiKey: string = 'a5c24512e3e3fcb6d2a21b9aeefdcaea';

  constructor(private httpClient: HttpClient) { 
  }

  getAllCountriesUri(): string {
    return `${this.countriesBaseUrl}all?access_key=${this.apiKey}`;
  }

  getCountries(): Observable<any> {
    const uri = this.getAllCountriesUri();
    return this.httpClient.get(uri);
  }  
}
