import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule}   from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule} from '@angular/material';
import { MatFormFieldModule, MatInputModule , MatSelectModule, MatOptionModule} from '@angular/material';
import { MatDatepickerModule,MatButtonModule,MatRippleModule,MatNativeDateModule  } from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';

import {Employee} from './employee.model';
import {Timesheet} from './Timesheet.model';
import {weeklyTimesheetParameter} from './WeekTimesheet.model';
import {Project} from './Project.model';
import {BackControllerService} from './back-controller.service';
import {SessionTokenService} from './session-token.service';


import { AppComponent } from './app.component';
import {AppNavigationService} from './appnavigation.service';
import { AppRoutingModule } from './/app-routing.module';
import { TimesheetLoginComponent } from './timesheet-login/timesheet-login.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { AddTimesheetComponent } from './add-timesheet/add-timesheet.component';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';
import { ViewTeamTimesheetComponent } from './view-team-timesheet/view-team-timesheet.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { ReviewTimesheetComponent } from './review-timesheet/review-timesheet.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetLoginComponent,
    SidemenuComponent,
    MyReportsComponent,
    AddTimesheetComponent,
    ViewTimesheetComponent,
    ViewTeamTimesheetComponent,
    EditTimesheetComponent,
    ReviewTimesheetComponent,
    ForgotPassComponent,
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,HttpClientModule,BrowserAnimationsModule,MatButtonModule,
    MatFormFieldModule, MatInputModule , MatSelectModule, MatOptionModule,ChartsModule,
     MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule,
     MatDatepickerModule,MatButtonModule,MatRippleModule,MatNativeDateModule,NgbModule,
    AppRoutingModule,RouterModule.forRoot([]),NgxPasswordToggleModule
  ],
  providers: [AppNavigationService,BackControllerService,SessionTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }