import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../employee.model';
import { map} from 'rxjs/operators';
import {SessionTokenService} from '../session-token.service';
import { AppNavigationService} from '../appnavigation.service';
import * as CryptoJS from 'crypto-js';
import {BackControllerService} from '../back-controller.service';
import {Timesheet} from '../Timesheet.model';
import {weeklyTimesheetParameter} from '../WeekTimesheet.model';

@Component({
  selector: 'app-view-timesheet',
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.css']
})
export class ViewTimesheetComponent implements OnInit {

  constructor(private http: Http, private session:SessionTokenService,private navigate:AppNavigationService,
    private backController:BackControllerService) { }
  
    httpdata;
    varSelectedEmployeeTimesheet:boolean;
  empId:string;
  empIdNum: number;
  encryptedEmpId: string;
  IsManager:boolean;
  currentDate: Date = new Date();
  month: number = this.currentDate.getMonth() + 1;

  year:number= this.currentDate.getFullYear();
  selectMonth2: number = this.month;
  selectYear2:number=2018;
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
      this.empIdNum = parseInt(this.empId);
      this.backController.isRM(this.empIdNum).subscribe((data : any)=>{
        this.CheckRM(data); 
     });
      
     this.selectMonth2 = this.month;
     this.selectYear2 = this.year;

     this.varSelectedEmployeeTimesheet=false;
     var employee1 : Employee = {emailId:'', password:'', empId: this.empIdNum, empName: "",IsRM:0};
     this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveEmployeeDetails/details', employee1).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayEmployeesDetails(data); });
     
  
  
  var employee : Employee = {emailId:'', password:'', empId: this.empIdNum, empName: "",IsRM:0};
  this.http.post('http://apimicro.trasers.com/TestAPI/api/RetreiveTeamMember/team', employee).pipe(map( (response) => response.json()))
  .subscribe( (data) => { console.log(data); this.displayTeamMember(data); });
  
  
  var employee1 : Employee = {emailId:'', password:this.selectMonth2+'-'+this.selectYear2, empId:this.empIdNum, empName: "",IsRM:0};
  this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee1).
  pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaydata(data); })
    
  
  }
  
  CheckRM(data){
    if(data.length>0) {this.IsManager = true; console.log(this.IsManager);}
  }
  
  employeeDetails;
    displayEmployeesDetails(data) {
      this.employeeDetails = data;
    }

  retrieveTeam;
  displayTeamMember(data)
  {
    this.retrieveTeam = data;
  }
      
EmployeeTimesheet:boolean=false;deletedTimesheet:boolean=false;deletedMessage:string="";
  displaydata(data) {this.httpdata = data; 
    if(this.httpdata.length>0)
    this.EmployeeTimesheet=true;
    else{
      this.deletedTimesheet=true;
      this.deletedMessage="No timesheet available for this month. Please select another month.";
    }
   }  
      
  
    
  timesheetWeek: string; timesheetDate: Date; date:string; month1:string; date1:string;
  reviewEmployeeTimesheet(selectedItem: any){
    console.log("method entered");
    this.timesheetWeek = selectedItem.timesheetWeek;
    var timesheetDates: string[] = this.timesheetWeek.split("--",1);
    var timesheetDate : string[] = timesheetDates[0].split("-",3)[0].split("/",3);
    this.month1 = timesheetDate[0]; this.date1=timesheetDate[1];
    if(parseInt(timesheetDate[0])<10) {
      this.month1 = "0"+timesheetDate[0];
    }
    if(parseInt(timesheetDate[1])<10) {
      this.date1 = "0"+timesheetDate[1];
    }
    var date: string = timesheetDate[2]+'-'+this.month1+'-'+this.date1;
    console.log("Date is date "+date);
    var weeklyTimesheet: weeklyTimesheetParameter = {timesheet1Date: new Date(Date.parse(date)), timesheet2Date:new Date(Date.parse(date)),timesheet3Date:new Date(Date.parse(date)),timesheet4Date:new Date(Date.parse(date)),timesheet5Date:new Date(Date.parse(date)),timesheet6Date:new Date(Date.parse(date)),timesheet7Date:new Date(Date.parse(date))}
    console.log("Date is date "+weeklyTimesheet.timesheet1Date);
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveTimesheetDates/timesheetDates', weeklyTimesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayTimesheet1(data); })
    

    var timesheet: Timesheet = {RMId:0,timesheet1Date: new Date(Date.parse(date)), empId: this.empIdNum, projectId: '',timesheet1DateEffort: 0,
      timesheet2DateEffort: 0,timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0,
      timesheet7DateEffort: 0, taskDescription: '', timesheetStatus: ''}
    
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveTimesheet/EditTimesheet', timesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data); this.displayTimesheet2(data);})
   
    this.varSelectedEmployeeTimesheet = true;
  }
  RetrieveTimesheet; RetrieveEffort;
  displayTimesheet1(data){
    this.RetrieveTimesheet = data;
  }  
  displayTimesheet2(data){
    this.RetrieveEffort = data;
    
  } 

  selectedTimesheetMonthly(){
    this.EmployeeTimesheet = false; this.varSelectedEmployeeTimesheet = false;this.deletedTimesheet=false;
    var employee2: Employee = { emailId: '', password: this.selectMonth2+'-'+this.selectYear2, empId: this.empIdNum, empName: "", IsRM: 0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee2).
      pipe(map((response) => response.json())).subscribe((data) => { console.log(data); this.displaydata(data); })
  }
  


 
}
