import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.page.html',
  styleUrls: ['./logout-page.page.scss'],
})
export class LogoutPagePage implements OnInit {

  constructor(private router: Router, private appComponent: AppComponent) { }
  
  ngOnInit() {
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['/cars-page']);
        this.appComponent.appPages = [
          { title: 'Cars', url: '/cars-page', icon: 'car-sport' },
          { title: 'Search', url: '/folder/Search', icon: 'search-circle' },
          { title: 'Login', url: '/login-page', icon: 'log-out' },
        ];
  }

}
