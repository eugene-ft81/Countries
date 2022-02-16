import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CountriesService } from 'src/app/services/countries.service';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.scss']
})
export class ListCountriesComponent implements OnInit {
  apiResponse!: any;
  regions!: any;
  displayedColumns = ['name','capital','region'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private service: CountriesService) { 
  }

  ngOnInit(): void {
    this.service.getCountries().subscribe(response => {
      this.apiResponse = response;
      this.regions = [...new Set(response.map((country: any) => country.region))]
        .filter(r=>r!=='')
        .sort((r1:any,r2:any)=>r1===r2 ? 0 : r1 > r2 ? 1 : -1);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }

  onCountriesSearch($event: any): void {
    this.dataSource.filter = $event.target.value;
  }

  onCountriesFilter($event: any): void {
    const region = $event.value.toLowerCase();
    const filteredData = _.filter(this.apiResponse, country => country.region.toLowerCase() === region);
    this.dataSource = new MatTableDataSource(filteredData);
  }  
}
