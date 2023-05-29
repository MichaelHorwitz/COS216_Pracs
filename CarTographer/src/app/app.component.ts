import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Cars', url: '/cars-page', icon: 'car-sport' },
    { title: 'Search', url: '/folder/Search', icon: 'search-circle' },
    { title: 'Logout', url: '/folder/Favourites', icon: 'log-out' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
