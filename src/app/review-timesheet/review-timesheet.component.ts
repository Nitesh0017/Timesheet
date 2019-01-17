import { Component, OnInit } from '@angular/core';
import {Timesheet} from '../Timesheet.model';
import {weeklyTimesheetParameter} from '../WeekTimesheet.model';
import {Project} from '../Project.model';
import {Employee} from '../employee.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { parse } from 'url';
import { AppNavigationService} from '../appnavigation.service';
import {SessionTokenService} from '../session-token.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-review-timesheet',
  templateUrl: './review-timesheet.component.html',
  styleUrls: ['./review-timesheet.component.css']
})
export class ReviewTimesheetComponent implements OnInit {

  selectedEmployee:boolean;
  teamDetails:boolean;
  varSelectedEmployeeTimesheet: boolean;
  reviewedTimesheet: boolean;
  empId:string;
  EmpIdNum: number;
  encryptedEmpId: string;
  RMId:number;
  constructor(private http:Http, private session:SessionTokenService, private navigate:AppNavigationService) { }

  ngOnInit() {
    if(this.session.isLoggednIn)
    {
      this.encryptedEmpId = this.session.getToken();
    }
    else
    {
      this.navigate.login();
    }
    this.empId = CryptoJS.AES.decrypt(this.encryptedEmpId, 'leap2018').toString(CryptoJS.enc.Utf8);
    this.RMId = parseInt(this.empId);
    this.selectedEmployee=false;
    this.reviewedTimesheet = false;
    this.varSelectedEmployeeTimesheet=false;
    this.teamDetails=true;
  var employee1 : Employee = {emailId:'', password:'', empId: this.RMId, empName: "",IsRM:0};
  this.http.post('http://apimicro.trasers.com/TestAPI/api/RetreiveTeamMember/team', employee1).pipe(map( (response) => response.json()))
  .subscribe( (data) => { console.log(data); this.displayTeamMember(data); })

  this.http.post('http://apimicro.trasers.com/TestAPI/api/retrieveTeamMemberDetails/team', employee1).pipe(map( (response) => response.json()))
  .subscribe( (data) => { console.log(data); this.displayTeamMemberDetails(data); })

  }
  retrieveTeam;
  displayTeamMember(data)
  {
    this.retrieveTeam = data;
  }
  retrieveTeamDetails;
  displayTeamMemberDetails(data){
    this.retrieveTeamDetails = data;
  }

  selectedEmployeeTimesheet(empId: number){
    this.reviewedTimesheet=false; this.teamDetails=false;
    var employee1 : Employee = {emailId:'', password:'', empId:empId, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveEmployeeDetails/details', employee1).
    pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayEmployeesDetails(data); });
    


    this.http.post('http://apimicro.trasers.com/TestAPI/api/viewSubmittedTimesheet/view', employee1)
    .pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaySelectedEmployeeTimesheet(data); })
    this.selectedEmployee = true;
  }

  refreshedTimesheet(empId: number){
    var employee1 : Employee = {emailId:'', password:'', empId:empId, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/viewSubmittedTimesheet/view', employee1)
    .pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaySelectedEmployeeTimesheet(data); })
    this.selectedEmployee = true;
  }

  employeeDetails;
    displayEmployeesDetails(data) {
      this.employeeDetails = data;
    }


  retrieveEmployeeTimesheet;
  displaySelectedEmployeeTimesheet(data)
  {
    if(data.length > 0)
    this.retrieveEmployeeTimesheet = data;
    else
    {
      this.reviewedTimesheet = true;
      this.reviewedMessage = "There is no timesheet available to review. Thank you.";
      this.selectedEmployee = false;
    }

  }

  timesheetWeek: string; timesheetDate: Date; date:string; month1:string; date1:string;
  reviewEmployeeTimesheet(selectedItem: any){
    this.reviewedTimesheet=false;
    this.varSelectedEmployeeTimesheet = true;
    this.timesheetWeek = selectedItem.timesheetWeek;
    var timesheetDates: string[] = this.timesheetWeek.split("--",1);
    var timesheetDate : string[] = timesheetDates[0].split("-",3)[0].split("/",3);


    this.month1 = timesheetDate[0]; this.date1=timesheetDate[1];
    if(parseInt(timesheetDate[0])<10) {
      this.month1 = "0"+timesheetDate[0];
    }
    else 
    {
      this.month1 =timesheetDate[0];
    }
    if(parseInt(timesheetDate[1])<10) {
      this.date1 = "0"+timesheetDate[1];
    }
    else{
      this.date1 = timesheetDate[1];
    }
    this.date= timesheetDate[2]+'-'+this.month1+'-'+this.date1;
    this.EmpIdNum = parseInt(selectedItem.employeeId);
    var weeklyTimesheet: weeklyTimesheetParameter = {timesheet1Date: new Date(Date.parse(this.date)), timesheet2Date:new Date(Date.parse(this.date)),timesheet3Date:new Date(Date.parse(this.date)),timesheet4Date:new Date(Date.parse(this.date)),timesheet5Date:new Date(Date.parse(this.date)),timesheet6Date:new Date(Date.parse(this.date)),timesheet7Date:new Date(Date.parse(this.date))}
    
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveTimesheetDates/timesheetDates', weeklyTimesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayTimesheet1(data); })
    

    var timesheet: Timesheet = {RMId:0,timesheet1Date: new Date(Date.parse(this.date)), empId: this.EmpIdNum, projectId: '',timesheet1DateEffort: 0,
      timesheet2DateEffort: 0,timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0,
      timesheet7DateEffort: 0, taskDescription: '', timesheetStatus: ''}
    
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveTimesheet/EditTimesheet', timesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data); this.displayTimesheet2(data);})
   
  }
  RetrieveTimesheet; RetrieveEffort;
  displayTimesheet1(data){
    this.RetrieveTimesheet = data;
  }  
  displayTimesheet2(data){
    this.RetrieveEffort = data;
    
  } 

  rejectTimesheet(){
    this.selectedEmployee=false;
    var timesheet: Timesheet = {RMId:this.RMId,timesheet1Date: new Date(Date.parse(this.date)), empId: this.EmpIdNum, projectId: '',timesheet1DateEffort: 0,
      timesheet2DateEffort: 0,timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0,
      timesheet7DateEffort: 0, taskDescription: '', timesheetStatus: 'Rejected'}
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ReviewEmployeeTimesheet/reviewed', timesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data); this.displayMessage(data);
    this.refreshedTimesheet(timesheet.empId);
  })
    if(this.selectedEmployee=true)
    {       
      this.http.post('http://apimicro.trasers.com/TestAPI/api/EmailRejectTimesheet/EditTimesheet', timesheet).subscribe( (data) => { console.log(data);})
    }
    this.reviewedTimesheet =true;
   this.varSelectedEmployeeTimesheet = false;
  }

  approveTimesheet(){
    this.selectedEmployee=false;
    console.log(this.date);
    var timesheet: Timesheet = {RMId:this.RMId,timesheet1Date: new Date(Date.parse(this.date)), empId: this.EmpIdNum, projectId: '',timesheet1DateEffort: 0,
      timesheet2DateEffort: 0,timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0,
      timesheet7DateEffort: 0, taskDescription: '', timesheetStatus: 'Approved'}
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ReviewEmployeeTimesheet/reviewed', timesheet).subscribe( (data) => { console.log(data); this.displayMessage(data);
    this.refreshedTimesheet(timesheet.empId);
  })
    if(this.selectedEmployee=true)
    {
       this.http.post('http://apimicro.trasers.com/TestAPI/api/EmailApproveTimesheet/EditTimesheet', timesheet).subscribe( (data) => { console.log(data);})
    }
    this.reviewedTimesheet =true;
   this.varSelectedEmployeeTimesheet = false;
  }

  CancelTimesheet(){
    this.varSelectedEmployeeTimesheet=false;
  }

  reviewedMessage: string;
  displayMessage(data){
   this.reviewedMessage = data['_body'];
   setTimeout(() => {
    this.selectedEmployee=true;
  }, 900);

   
  } 
}
