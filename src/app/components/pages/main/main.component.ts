import { Component, OnInit } from '@angular/core';
import country from "world-map-country-shapes";
import { NovelCovid } from 'novelcovid';
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    mapCountries: any = '';
    listCountries = [];
    countryActive: any = 'MX';
    cases: any = '';
    deaths: any = '';
    recovered: any = '';
    casesWorld: any = '';
    deathsWorld: any = '';
    recoveredWorld: any = '';
    url: string = '';
    track = new NovelCovid();
    constructor() { }

    ngOnInit() {
        this.mapCountries = country.map(async country => {
            this.listCountries.push(country);
        });
        this.track.countries('MX').then(response => {
            this.cases = response['cases'];
            this.recovered = response['recovered'];
            this.deaths = response['deaths'];
        })
        this.track.all().then(response => {
            this.casesWorld = response['cases'];
            this.recoveredWorld = response['recovered'];
            this.deathsWorld = response['deaths'];
        })
        this.url = 'https://www.countryflags.io/' + this.countryActive + '/flat/64.png';
    }
    selectCountry(id_country) {
        this.url = 'https://www.countryflags.io/' + id_country + '/flat/64.png';
        this.track.countries(id_country).then(response => {
            this.cases = response['cases'];
            this.recovered = response['recovered'];
            this.deaths = response['deaths'];
        })
        this.countryActive = id_country;
    }

}
