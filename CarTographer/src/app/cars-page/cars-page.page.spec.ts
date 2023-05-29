import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarsPagePage } from './cars-page.page';

describe('CarsPagePage', () => {
  let component: CarsPagePage;
  let fixture: ComponentFixture<CarsPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
