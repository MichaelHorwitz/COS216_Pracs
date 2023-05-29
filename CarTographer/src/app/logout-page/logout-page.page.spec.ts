import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutPagePage } from './logout-page.page';

describe('LogoutPagePage', () => {
  let component: LogoutPagePage;
  let fixture: ComponentFixture<LogoutPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogoutPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
