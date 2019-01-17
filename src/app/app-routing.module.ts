import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TimesheetLoginComponent} from './timesheet-login/timesheet-login.component';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {MyReportsComponent} from './my-reports/my-reports.component';
import {AddTimesheetComponent} from './add-timesheet/add-timesheet.component';
import {ViewTeamTimesheetComponent} from './view-team-timesheet/view-team-timesheet.component';
import {ViewTimesheetComponent} from './view-timesheet/view-timesheet.component';
import {EditTimesheetComponent} from './edit-timesheet/edit-timesheet.component';
import {ReviewTimesheetComponent} from './review-timesheet/review-timesheet.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'login', data: { title: 'Login' }, pathMatch: 'full'},
  {
    path: 'forgotPass', component: ForgotPassComponent, data: {title: 'Forgot Password'}
  },
  {
    path: 'login', component: TimesheetLoginComponent, data: {title: 'Login'}
    // children: [
    //   {path: '', component: TimesheetLoginComponent, data: { title: 'Login' }}
    // ]
  },
  
  { path: 'home', component: SidemenuComponent,
    children: [
      { path: '', redirectTo: 'myReports', data: { title: 'My Reports' }, pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'myReports', component: MyReportsComponent, data: { title: 'My Reports' } , canActivate: [AuthGuard]},
      { path: 'viewTimesheet', component: ViewTimesheetComponent, data: { title: 'Timesheet' } , canActivate: [AuthGuard]},
      { path: 'addTimesheet/:id1/:id2/:id3', component: AddTimesheetComponent, data: { title: 'Add Timesheet' } , canActivate: [AuthGuard]},
      { path: 'editTimesheet/:id', component: EditTimesheetComponent, data: { title: 'Edit Timesheet' }, canActivate: [AuthGuard] },
      { path: 'reviewTimesheet', component: ReviewTimesheetComponent, data: { title: 'Review Timesheet' }, canActivate: [AuthGuard]},
      { path: 'viewTeamTimesheet', component: ViewTeamTimesheetComponent, data: { title: 'Team Timesheet' }, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [
  RouterModule.forRoot(  routes  ) 
],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
