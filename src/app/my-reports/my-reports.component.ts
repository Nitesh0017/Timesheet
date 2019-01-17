import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee.model';
import { map } from 'rxjs/operators';
import { SessionTokenService } from '../session-token.service';
import { AppNavigationService } from '../appnavigation.service';
import * as CryptoJS from 'crypto-js';
import { BackControllerService } from '../back-controller.service';
import { Timesheet } from '../Timesheet.model';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.css']
})
export class MyReportsComponent implements OnInit {
  constructor(private http: Http, private session: SessionTokenService, private navigate: AppNavigationService,
    private backController: BackControllerService) { }

  httpdata; httpdata3;
  pieChartOptions: any; pieChartOptions1: any;
  chart1: boolean = false; chart2: boolean = false; pieChartOptions3: any; 
  chart3: boolean = false;  Timesheet: boolean = false;
 ChartLabels1 = []; ChartLabels3 = [];
 pieChartLabels3:any;   pieChartLabels=[];   pieChartLabels1:any;
  currentDate: Date = new Date();
  month: number = this.currentDate.getMonth() + 1;
  year: number = 2018; monthx:number; yearx:number;
  selectMonth: number = this.month;
  selectMonth1: number = this.month; 
  selectMonth2: number = this.month;
  selectYear: number = this.year; selectYear1: number = this.year;
  selectYear2: number = this.year;
  selectEmployee: number; selectProject: string;
  selectMonth3: number = this.month;
  selectYear3: number = this.year;
  color: number = 2;
  colorCode1: number = 0;
  colorCode2: number = 0;
  colorCode3: number = 0;
  ColorCodeString: string;
  colorCode: any = []; colorCoden: any = []; colorCodel: any = [];
  // CHART COLOR.
  pieChartColor: any;
  pieChartColor1: any;
  pieChartColor3: any;

  valuedata: any = [];
  valuedata1: any = [];
  valuedata3: any = [];
    charts2Data:any;
  pieChartData: any; pieChartData1: any; pieChartData3: any;
  empId: string;
  empIdNum: number;
  encryptedEmpId: string;
  IsManager: boolean;chart1Msg:boolean; chart2Msg:boolean; chart3Msg:boolean;
  chart1Message:string="";chart2Message:string="";chart3Message:string="";
  ngOnInit() {
    if (this.session.isLoggednIn) {
      this.encryptedEmpId = this.session.getToken();
    }
    else {
      this.navigate.login();
    }
    this.empId = CryptoJS.AES.decrypt(this.encryptedEmpId, 'leap2018').toString(CryptoJS.enc.Utf8);
    this.empIdNum = parseInt(this.empId);
    this.backController.isRM(this.empIdNum).subscribe((data: any) => {
      this.CheckRM(data);
    });
    this.monthx= this.currentDate.getMonth()+1;
    this.yearx= this.currentDate.getFullYear();
    if(this.monthx == 1) {
      this.month = 12; this.year = this.yearx -1;
    }
    else{
      this.month = this.monthx-1; this.year = this.yearx -1;
    }
    console.log(this.month, this.year);
    this.selectMonth = this.month;
    this.selectMonth1 = this.month; this.selectMonth2 = this.month;
    this.selectYear = this.year; this.selectYear1 = this.year;
    this.selectYear2 = this.year;this.selectMonth3 = this.month; this.selectYear3 = this.year;
    this.selectEmployee = this.empIdNum;
    this.selectProject = 'Other';

    //personaldetails
    var employee : Employee = {emailId:'', password:'', empId:this.empIdNum, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveEmployeeDetails/details', employee).pipe(map( (response) => response.json()))
    .subscribe((data)=>{console.log(data);
      this.displayEmployeeDetails(data); 
   }); 

    //chart1
    var employee1: Employee = { emailId: '', password: this.month + '-' + this.year, empId: this.empIdNum, empName: "", IsRM: 0 };
    console.log(employee1.IsRM+','+employee1.password+','+employee1.empId);
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTeamProjectHours/view', employee1).pipe(map((response) => response.json())).
      subscribe((data) => {
        this.httpdata1 = data;
        if (this.httpdata1.length > 0) {
        for (let i = 0; i < this.httpdata1.length; i++) {
          this.pieChartLabels.push(this.httpdata1[i].projectId);
          this.valuedata.push(this.httpdata1[i].timesheet1DateEffort);
          if (this.colorCode1 > 240) this.colorCode1 = 40;
          if (this.colorCode2 > 240) this.colorCode2 = 30;
          if (this.colorCode3 > 240) this.colorCode3 = 60;
          if (i % 2 == 0) {
            this.colorCode1 = i * this.colorCode1 + 158;
            this.colorCode2 = i * this.colorCode2 + 255;
            this.colorCode3 = i * this.colorCode3 + 120;
          }
          else {
            this.colorCode1 = i * this.colorCode1 + 97;
            this.colorCode2 = i * this.colorCode2 - 98;
            this.colorCode3 = i * this.colorCode3;
          }

          this.ColorCodeString = 'rgba(' + this.colorCode1 + ',' + this.colorCode2 + ',' + this.colorCode3 + ',0.9)';
          this.colorCode.push(this.ColorCodeString);
        }
        this.chart1 = true;
      }
      else {
        this.chart1 = true; this.chart1Msg=true;
        this.chart1Message ="No data exist for this combination."
      }
      })

    this.pieChartData = [
      {
        data: this.valuedata
      }
    ];

    this.pieChartColor = [
      {
        backgroundColor: ['rgb(57,106,177)','rgb(218,124,48)','rgb(62,150,81)','rgb(204,37,41)','rgb(83,81,84)','rgb(107,71,154)','rgb(146,36,40)','rgb(148,139,61)']
      }
    ]

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    //chart 2 

    this.chart2 = false;this.chart2Msg=true;
    this.pieChartData1 = []; this.pieChartColor1 = []; this.pieChartLabels1 = []; this.valuedata1 = []; this.colorCoden = [];
    var employee2: Employee = { emailId: this.selectProject, password: this.selectMonth1 + '-' + this.selectYear1, empId: this.empIdNum, empName: "", IsRM: 0 };
    console.log(employee2.emailId + " " + employee2.empId + " " + employee2.password);
        //var employee2: Employee = { emailId: this.selectProject, password: this.month + '-' + this.year, empId: this.empIdNum, empName: "", IsRM: 0 };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTeamSelectedProjectHoursEffort/view', employee2).pipe(map((response) => response.json())).
      subscribe((data) => {
        console.log(data);
        this.httpdata2 = data;
        if (this.httpdata2.length > 0) {
        for (let i = 0; i < this.httpdata2.length; i++) {
          this.pieChartLabels1.push(this.httpdata2[i].projectId);
          this.valuedata1.push(this.httpdata2[i].timesheet1DateEffort);
          if (this.colorCode1 > 240) this.colorCode1 = 40;
          if (this.colorCode2 > 240) this.colorCode2 = 30;
          if (this.colorCode3 > 240) this.colorCode3 = 60;
          if (i % 2 == 0) {
            this.colorCode1 = i * this.colorCode1 + 158;
            this.colorCode2 = i * this.colorCode2 + 255;
            this.colorCode3 = i * this.colorCode3 + 120;
          }
          else {
            this.colorCode1 = i * this.colorCode1 + 97;
            this.colorCode2 = i * this.colorCode2 - 98;
            this.colorCode3 = i * this.colorCode3;
          }

          this.ColorCodeString = 'rgba(' + this.colorCode1 + ',' + this.colorCode2 + ',' + this.colorCode3 + ',0.9)';
          this.colorCoden.push(this.ColorCodeString);
        }
        this.chart2 = true;
      }
      else {
        this.chart2 = true; this.chart2Msg=true;
        this.chart2Message ="No data exist for this combination."
      }
    })

    this.pieChartData1 = [
      {
        label: 'Hours spend at '+employee2.emailId,
        data: this.valuedata1
      }
    ];

    this.pieChartColor1 = [
      {
        backgroundColor: ['rgb(62,150,81)','rgb(204,37,41)','rgb(107,71,154)','rgb(83,81,84)','rgb(57,106,177)','rgb(218,124,48)','rgb(146,36,40)','rgb(148,139,61)']
      }
    ]

    this.pieChartOptions1 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Hours spend'
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Team members'
          }
        }]
      }
    }


    //chart 3
    var employee2: Employee = { emailId: '', password: this.month + '-' + this.year, empId: this.empIdNum, empName: "", IsRM: 0 };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee2).pipe(map((response) => response.json())).
    subscribe((data) => { 
        console.log(data);
        this.httpdata3 = data;
        if (this.httpdata3.length > 0) {
        for (let i = 0; i < this.httpdata3.length; i++) {
          this.ChartLabels3.push(this.httpdata3[i].timesheetWeek);
          this.valuedata3.push(this.httpdata3[i].effortHours);
          if (this.colorCode1 > 240) this.colorCode1 = 40;
          if (this.colorCode2 > 240) this.colorCode2 = 30;
          if (this.colorCode3 > 240) this.colorCode3 = 60;
          if (i % 2 == 0) {
            this.colorCode1 = i * this.colorCode1 + 158;
            this.colorCode2 = i * this.colorCode2 + 255;
            this.colorCode3 = i * this.colorCode3 + 120;
          }
          else {
            this.colorCode1 = i * this.colorCode1 + 97;
            this.colorCode2 = i * this.colorCode2 - 98;
            this.colorCode3 = i * this.colorCode3;
          }

          this.ColorCodeString = 'rgba(' + this.colorCode1 + ',' + this.colorCode2 + ',' + this.colorCode3 + ',0.9)';
          this.colorCodel.push(this.ColorCodeString);
        }
        this.chart3 = true;
      }
      else {
        this.chart3 = true; this.chart3Msg=true;
        this.chart3Message ="No data exist for this combination."
      }
    })
    this.pieChartLabels3=this.ChartLabels3;

    this.pieChartData3 = [
      {
        label: 'Weekly Timesheet',
        data: this.valuedata3
      }
    ];

    this.pieChartColor3 = [
      {
        backgroundColor: ['rgb(62,150,81)','rgb(204,37,41)','rgb(107,71,154)','rgb(146,36,40)','rgb(57,106,177)','rgb(218,124,48)','rgb(83,81,84)','rgb(148,139,61)']
      }
    ]

    this.pieChartOptions3 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Hours spend'
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Weeks'
          }
        }]
      }


    }



    var employee: Employee = { emailId: '', password: '', empId: this.empIdNum, empName: "", IsRM: 0 };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveTeamProjects/team', employee).pipe(map((response) => response.json()))
      .subscribe((data) => { console.log(data); this.displayTeamProjects(data); });


    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetreiveTeamMember/team', employee).pipe(map((response) => response.json()))
      .subscribe((data) => { console.log(data); this.displayTeamMember(data); });


    var employee1: Employee = { emailId: '', password: this.month + '-' + this.year, empId: this.empIdNum, empName: "", IsRM: 0 };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee1).
      pipe(map((response) => response.json())).subscribe((data) => { console.log(data); this.displaydata(data); })


  }

  CheckRM(data) {
    if (data.length > 0) { this.IsManager = true; console.log(this.IsManager); }
  }

  retrieveTeam;
  displayTeamMember(data) {
    this.retrieveTeam = data;
  }

  retrieveProjects;
  displayTeamProjects(data) {
    this.retrieveProjects = data;
  }

  httpdata1; httpdata2;
  displaydata(data) {
    this.httpdata = data;
    if (this.httpdata.length > 0) {
      this.Timesheet = true;
    }
    else{
      this.deletedTimesheet=true;
      this.deletedMessage="You have not submitted any timesheet for this month. Please select another month.";
    }
  }


  onChartClick(event) {
    console.log(event);
    console.log(this.pieChartLabels, this.valuedata);
    console.log(this.pieChartData);
    console.log(this.pieChartColor);
  }

  employeeName:string;
  displayEmployeeDetails(data){
    this.employeeName = data[0]['empName'];
  }

  onEditTimesheet(selectedItem: any) {
    this.timesheetWeek = selectedItem.timesheetWeek;
    var timesheetDates: string[] = this.timesheetWeek.split("--", 1);
    var timesheetDate: string[] = timesheetDates[0].split("-", 3);
    var date: string = timesheetDate[2] + "-" + timesheetDate[1] + "-" + timesheetDate[0];
    var timesheet5: Timesheet = { RMId: 0, empId: this.empIdNum, projectId: this.timesheetWeek, timesheet1Date: new Date(Date.parse(date)), timesheet1DateEffort: 0, timesheet2DateEffort: 0, timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0, timesheet7DateEffort: 0, taskDescription: "", timesheetStatus: selectedItem.timesheetStatus };
    if(selectedItem.timesheetStatus == 'Approved' || selectedItem.timesheetStatus == 'Rejected') {
    this.http.post('http://apimicro.trasers.com/TestAPI/api/EmailEdit/EditTimesheet', timesheet5).subscribe((data) => { console.log(data); })
    }
    this.navigate.editTimesheet(selectedItem.timesheetWeek);
  }

  deletedTimesheet: boolean = false;
  timesheetWeek: string;  month1:string; date1:string;
  onDeleteTimesheet(selectedItem: any) {
    this.deletedTimesheet = true; this.Timesheet = false;
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
    var timesheet6: Timesheet = { RMId: 0, empId: this.empIdNum, projectId: this.timesheetWeek, timesheet1Date: new Date(Date.parse(date)), timesheet1DateEffort: 0, timesheet2DateEffort: 0, timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0, timesheet7DateEffort: 0, taskDescription: "", timesheetStatus: selectedItem.timesheetStatus };
     if(selectedItem.timesheetStatus == 'Approved' || selectedItem.timesheetStatus == 'Rejected') {
      this.http.post('http://apimicro.trasers.com/TestAPI/api/Emaildelete/deleteTimesheet', timesheet6).subscribe((data) => { console.log(data); })
      }
    var timesheet5: Timesheet = { RMId: 0, empId: this.empIdNum, projectId: '', timesheet1Date: new Date(Date.parse(date)), timesheet1DateEffort: 0, timesheet2DateEffort: 0, timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0, timesheet7DateEffort: 0, taskDescription: "", timesheetStatus: "" };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/DeleteTimesheet/delete', timesheet5).subscribe((data) => { console.log(data); this.displayMessage(data); })
    setTimeout(() => {
      this.navigate.home();
    }, 900);

  }
  deletedMessage: string;
  displayMessage(data) {
    this.deletedMessage = data['_body'];
    var employee1: Employee = { emailId: '', password: this.selectMonth2 + '-' + this.selectYear2, empId: this.empIdNum, empName: "", IsRM: this.month };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee1).
      pipe(map((response) => response.json())).subscribe((data) => { console.log(data); this.displaydata(data); })
  }


  retrieveTimesheetData;
  displayTimesheet(data) {
    this.retrieveTimesheetData = data;
  }

  selectedEmployeeTimesheet() {
    this.chart1 = false;this.chart1Msg=true;
    this.pieChartData = []; this.pieChartColor = []; this.pieChartLabels = []; this.valuedata = []; this.colorCode = [];
    var employee1: Employee = { emailId: '', password: this.selectMonth + '-' + this.selectYear, empId: this.selectEmployee, empName: "", IsRM: 0 };
    console.log(employee1.empId + " " + employee1.IsRM);
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTeamProjectHours/view', employee1).pipe(map((response) => response.json())).
      subscribe((data) => {
        console.log(data);
        this.httpdata1 = data;
        
        if (this.httpdata1.length > 0) {
        for (let i = 0; i < this.httpdata1.length; i++) {
          this.pieChartLabels.push(this.httpdata1[i].projectId);
          this.valuedata.push(this.httpdata1[i].timesheet1DateEffort);
          if (this.colorCode1 > 240) this.colorCode1 = 40;
          if (this.colorCode2 > 240) this.colorCode2 = 30;
          if (this.colorCode3 > 240) this.colorCode3 = 60;
          if (i % 2 == 0) {
            this.colorCode1 = i * this.colorCode1 + 158;
            this.colorCode2 = i * this.colorCode2 + 255;
            this.colorCode3 = i * this.colorCode3 + 120;
          }
          else {
            this.colorCode1 = i * this.colorCode1 + 97;
            this.colorCode2 = i * this.colorCode2 - 98;
            this.colorCode3 = i * this.colorCode3;
          }

          this.ColorCodeString = 'rgba(' + this.colorCode1 + ',' + this.colorCode2 + ',' + this.colorCode3 + ',0.9)';
          this.colorCode.push(this.ColorCodeString);
        }
        this.chart1 = true;
      }
      else {
        this.chart1 = true; this.chart1Msg=true;
        this.chart1Message ="No data exist for this combination."
      }
      })

    this.pieChartData = [
      {
        data: this.valuedata
      }
    ];

    this.pieChartColor = [
      {
        backgroundColor: ['rgb(83,81,84)','rgb(57,106,177)','rgb(218,124,48)','rgb(62,150,81)','rgb(204,37,41)','rgb(107,71,154)','rgb(146,36,40)','rgb(148,139,61)']
      }
    ]

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

  }




  selectedProjectTeamTimesheet() {
    this.chart2 = false;this.chart2Msg=true;
    this.pieChartData1 = []; this.pieChartColor1 = []; this.pieChartLabels1 = []; this.valuedata1 = []; this.colorCoden = [];
    var employee1: Employee = { emailId: this.selectProject, password: this.selectMonth1 + '-' + this.selectYear1, empId: this.empIdNum, empName: "", IsRM: 0 };
    console.log(employee1.emailId + " " + employee1.empId + " " + employee1.IsRM);
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTeamSelectedProjectHoursEffort/view', employee1).
      pipe(map((response) => response.json())).
      subscribe((data) => {
        console.log(data);
        this.httpdata2 = data;
        if (this.httpdata2.length > 0) {
        for (let i = 0; i < this.httpdata2.length; i++) {
          this.pieChartLabels1.push(this.httpdata2[i].projectId);
          this.valuedata1.push(this.httpdata2[i].timesheet1DateEffort);
          if (this.colorCode1 > 240) this.colorCode1 = 40;
          if (this.colorCode2 > 240) this.colorCode2 = 30;
          if (this.colorCode3 > 240) this.colorCode3 = 60;
          if (i % 2 == 0) {
            this.colorCode1 = i * this.colorCode1 + 158;
            this.colorCode2 = i * this.colorCode2 + 255;
            this.colorCode3 = i * this.colorCode3 + 120;
          }
          else {
            this.colorCode1 = i * this.colorCode1 + 97;
            this.colorCode2 = i * this.colorCode2 - 98;
            this.colorCode3 = i * this.colorCode3;
          }

          this.ColorCodeString = 'rgba(' + this.colorCode1 + ',' + this.colorCode2 + ',' + this.colorCode3 + ',0.9)';
          this.colorCoden.push(this.ColorCodeString);
        }
        this.chart2 = true;
      }
      else {
        this.chart2 = true; this.chart2Msg=true;
        this.chart2Message ="No data exist for this combination."
      }
    })

    this.pieChartData1 = [
      {
        label: 'Hours spend at '+employee1.emailId,
        data: this.valuedata1
      }
    ];

    this.pieChartColor1 = [
      {
        backgroundColor: ['rgb(62,150,81)','rgb(204,37,41)','rgb(107,71,154)','rgb(83,81,84)','rgb(57,106,177)','rgb(218,124,48)','rgb(146,36,40)','rgb(148,139,61)']
      }
    ]

    this.pieChartOptions1 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Hours spend'
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Team members'
          }
        }]
      }
    }

  }

  selectedTimesheetMonthly() {
    this.Timesheet = false;this.deletedTimesheet=false;
    var employee1: Employee = { emailId: '', password: this.selectMonth2 + '-' + this.selectYear2, empId: this.empIdNum, empName: "", IsRM: 0 };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee1).
      pipe(map((response) => response.json())).subscribe((data) => { console.log(data); this.displaydata(data); })
  }

  selectedEmployeeTimesheetMonthly(){
    //chart 3
    this.chart3 = false;this.chart3Msg=false;
    this.pieChartData3 = []; this.pieChartColor3 = []; this.pieChartLabels3 = []; this.valuedata3 = []; this.colorCodel = [];
    
    var employee2: Employee = { emailId: '', password: this.selectMonth3 + '-' + this.selectYear3, empId: this.empIdNum, empName: "", IsRM: 0 };
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee2).pipe(map((response) => response.json())).
    subscribe((data) => { 
        console.log(data);
        this.httpdata3 = data;
        if (this.httpdata3.length > 0) {
        for (let i = 0; i < this.httpdata3.length; i++) {
          this.pieChartLabels3.push(this.httpdata3[i].timesheetWeek);
          this.valuedata3.push(this.httpdata3[i].effortHours);
          if (this.colorCode1 > 240) this.colorCode1 = 40;
          if (this.colorCode2 > 240) this.colorCode2 = 30;
          if (this.colorCode3 > 240) this.colorCode3 = 60;
          if (i % 2 == 0) {
            this.colorCode1 = i * this.colorCode1 + 158;
            this.colorCode2 = i * this.colorCode2 + 255;
            this.colorCode3 = i * this.colorCode3 + 120;
          }
          else {
            this.colorCode1 = i * this.colorCode1 + 97;
            this.colorCode2 = i * this.colorCode2 - 98;
            this.colorCode3 = i * this.colorCode3;
          }

          this.ColorCodeString = 'rgba(' + this.colorCode1 + ',' + this.colorCode2 + ',' + this.colorCode3 + ',0.9)';
          this.colorCodel.push(this.ColorCodeString);
        }
        this.chart3 = true;
      }
      else {
        this.chart3 = true; this.chart3Msg=true;
        this.chart3Message ="No data exist for this combination."
      }
    })

    this.pieChartData3 = [
      {
        data: this.valuedata3
      }
    ];

    this.pieChartColor3 = [
      {
        backgroundColor: ['rgb(57,106,177)','rgb(218,124,48)','rgb(146,36,40)','rgb(148,139,61)','rgb(62,150,81)','rgb(204,37,41)','rgb(107,71,154)','rgb(83,81,84)']
      }
    ]

    this.pieChartOptions3 = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Hours spend'
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Weeks'
          }
        }]
      }


    }
  }


}