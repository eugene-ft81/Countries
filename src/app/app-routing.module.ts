import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListCountriesComponent } from './countries/list-countries/list-countries.component';
import { CountryComponent } from './countries/country/country.component';

const routes: Routes = [
  { path: '', component: ListCountriesComponent },
  { path: ':country', component: CountryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
