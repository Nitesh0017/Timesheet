import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetLoginComponent } from './timesheet-login.component';

describe('TimesheetLoginComponent', () => {
  let component: TimesheetLoginComponent;
  let fixture: ComponentFixture<TimesheetLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
