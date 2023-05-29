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
        url: 'http://localhost:3000/validate-login.php',
        //headers: { 'X-Fake-Header': 'Fake-Value' },
        data: {
          email: "test@test",//this.username,
          password: 'testTEST1!'//this.password
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
          { title: 'Search', url: '/folder/Search', icon: 'search-circle' },
          { title: 'Logout', url: '/logout-page', icon: 'log-out' },
        ];
      } else {
        alert("Bad login");
        this.loggedIn = false;
      }
      

  }
  
}
