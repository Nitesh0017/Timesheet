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
  selector: 'app-view-team-timesheet',
  templateUrl: './view-team-timesheet.component.html',
  styleUrls: ['./view-team-timesheet.component.css']
})
export class ViewTeamTimesheetComponent implements OnInit {
  selectedEmployee:boolean;
  selectedEmployeeId:number=0;
  varSelectedEmployeeTimesheet: boolean;
  reviewedTimesheet: boolean;
  currentDate: Date = new Date();

  month: number = this.currentDate.getMonth() + 1;

  year:number= this.currentDate.getFullYear();
  selectMonth2: number = this.month;
  selectYear2:number=2018;EmployeeTimesheet:boolean;
  empId:string;
  RMId: number;
  EmpIdNum:number;
  encryptedEmpId: string;
  teamDetails:boolean;
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
    this.selectMonth2 = this.month;
     this.selectYear2 = this.year;
    this.selectedEmployee=false;
    this.reviewedTimesheet = false;
    this.varSelectedEmployeeTimesheet=false;
    this.deletedTimesheet=false;this.EmployeeTimesheet=false;this.teamDetails=true;

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
    this.teamDetails=false;
    this.varSelectedEmployeeTimesheet = false;
    this.selectedEmployeeId=empId;
    this.EmployeeTimesheet=false;
    this.deletedTimesheet=false;
    this.selectedEmployee=false;
    var employee1 : Employee = {emailId:'', password:'', empId:empId, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveEmployeeDetails/details', employee1).
    pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayEmployeesDetails(data); });
    
    var employee2: Employee = { emailId: '', password: this.selectMonth2+'-'+this.selectYear2, empId: empId, empName: "", IsRM: 0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee2).
      pipe(map((response) => response.json())).subscribe((data) => { console.log(data); this.displaySelectedEmployeeTimesheet(data); })

  }

  employeeDetails;
    displayEmployeesDetails(data) {
      this.employeeDetails = data;
      this.selectedEmployee=true;
      console.log(this.selectedEmployee);
    }


  retrieveEmployeeTimesheet;deletedTimesheet:boolean=false;deletedMessage:string;
  displaySelectedEmployeeTimesheet(data)
  {
    this.retrieveEmployeeTimesheet = data;
    if(this.retrieveEmployeeTimesheet.length>0)
    {
    this.EmployeeTimesheet=true;
    }
    else
    {
      this.deletedTimesheet=true;
      this.deletedMessage="No timesheet available for this month.";
    }
  }

  timesheetWeek: string; timesheetDate: Date; date:string; month1:string; date1:string;
  reviewEmployeeTimesheet(selectedItem: any){
   
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
    var date: string = timesheetDate[2]+'-'+this.month1+'-'+this.date1;
    console.log("Date is "+date);
    this.EmpIdNum = parseInt(selectedItem.employeeId);
    var weeklyTimesheet: weeklyTimesheetParameter = {timesheet1Date: new Date(Date.parse(date)), timesheet2Date:new Date(Date.parse(date)),timesheet3Date:new Date(Date.parse(date)),timesheet4Date:new Date(Date.parse(date)),timesheet5Date:new Date(Date.parse(date)),timesheet6Date:new Date(Date.parse(date)),timesheet7Date:new Date(Date.parse(date))}
    
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveTimesheetDates/timesheetDates', weeklyTimesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayTimesheet1(data); })
    

    var timesheet: Timesheet = {RMId:0,timesheet1Date: new Date(Date.parse(date)), empId: this.EmpIdNum, projectId: '',timesheet1DateEffort: 0,
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
    this.varSelectedEmployeeTimesheet = true;
    
  } 

  selectedTimesheetMonthly(){
    this.EmployeeTimesheet=false;
    this.deletedTimesheet=false;
    this.varSelectedEmployeeTimesheet = false;

    this.deletedTimesheet=false;
    this.selectedEmployee=true;
    var employee2: Employee = { emailId: '', password: this.selectMonth2+'-'+this.selectYear2, empId: this.selectedEmployeeId, empName: "", IsRM:0 };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee2).
      pipe(map((response) => response.json())).subscribe((data) => { console.log(data); this.displaySelectedEmployeeTimesheet(data); })
  }


 
}
