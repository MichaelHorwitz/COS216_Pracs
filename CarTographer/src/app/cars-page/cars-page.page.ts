import { Component, OnInit } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';



@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.page.html',
  styleUrls: ['./cars-page.page.scss'],
})
export class CarsPagePage implements OnInit {
  public engine!: String;
  public allCars: any;
  public username!: string;
  constructor() { }

  ngOnInit() {
    this.doPost();
    if (localStorage.getItem("apiKey")) {
      this.username = 'Your ApiKey is: ' + localStorage.getItem("apiKey");
    } else {
      this.username = '';
    }
  }
  public doPost = async () => {
    const options = {
      url: 'http://localhost:3000/api.php',
      //headers: { 'X-Fake-Header': 'Fake-Value' },
      data: {
        "apikey": "fUFrY90651",
        "type": "GetAllCars",
        "return": "*",
        "limit": 5,
      },
    };
  
    //const response: HttpResponse = await CapacitorHttp.post(options);
  
    const response = await CapacitorHttp.request({ ...options, method: 'POST' });
    var data = JSON.parse(response.data);
    data = data.data;
    this.allCars = data;
    this.engine = data[0].transmission;
    //console.log(data);
  };
}

