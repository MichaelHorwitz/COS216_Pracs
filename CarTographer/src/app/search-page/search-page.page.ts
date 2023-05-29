import { Component, OnInit } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  public searchVal!: string;
  public allCars: any;
  constructor() { }

  ngOnInit() {
  }
  public doPost = async () => {
    const options = {
      url: 'https://wheatley.cs.up.ac.za/u22512323/api.php',
      //headers: { 'X-Fake-Header': 'Fake-Value' },
      data: {
        "apikey": "fUFrY90651",
        "type": "GetAllCars",
        "return": "*",
        "limit": 5,
        "search": {"model": this.searchVal}
      },
      headers:{
        Authorization: `Basic ${btoa('u22512323' + ':' + 'Pf9xghu4YSFyHw')}`
      }
    };
  
    //const response: HttpResponse = await CapacitorHttp.post(options);
  
    const response = await CapacitorHttp.request({ ...options, method: 'POST' });
    var data = JSON.parse(response.data);
    data = data.data;
    this.allCars = data;
    
  };
  
}
