import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamTimesheetComponent } from './view-team-timesheet.component';

describe('ViewTeamTimesheetComponent', () => {
  let component: ViewTeamTimesheetComponent;
  let fixture: ComponentFixture<ViewTeamTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTeamTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
