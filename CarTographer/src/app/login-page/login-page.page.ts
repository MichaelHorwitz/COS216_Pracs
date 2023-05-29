import { Component, OnInit } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  public username!: string;
  public password!: string;
  public loggedIn!: boolean;
  constructor(private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
  }
  public submit = async () => {

      const options = {
        url: 'https://wheatley.cs.up.ac.za/u22512323/validate-login.php',
        //headers: { 'X-Fake-Header': 'Fake-Value' },
        data: {
          email: this.username,
          password: this.password //'testTEST1!'
      },
      headers:{
        Authorization: `Basic ${btoa('u22512323' + ':' + 'Pf9xghu4YSFyHw')}`
      }  
      };
    
      //const response: HttpResponse = await CapacitorHttp.post(options);
    
      const response = await CapacitorHttp.request({ ...options, method: 'POST' });
      var valid = response.data;
      if (valid !== '') {
        this.loggedIn = true;
        localStorage.setItem("apiKey", valid);
        //console.log(valid);
        this.router.navigate(['/cars-page']);
        this.appComponent.appPages = [
          { title: 'Cars', url: '/cars-page', icon: 'car-sport' },
          { title: 'Search', url: '/search-page', icon: 'search-circle' },
          { title: 'Logout', url: '/logout-page', icon: 'log-out' },
        ];
      } else {
        alert("Bad login");
        this.loggedIn = false;
      }
      

  }
  
}
