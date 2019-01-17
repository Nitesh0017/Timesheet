import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Http} from '@angular/http';
import * as CryptoJS from 'crypto-js';

import {Employee} from '../employee.model';
import {BackControllerService} from '../back-controller.service';
import {SessionTokenService} from '../session-token.service';
import {AppNavigationService} from '../appnavigation.service';

@Component({
  selector: 'app-timesheet-login',
  templateUrl: './timesheet-login.component.html',
  styleUrls: ['./timesheet-login.component.css']
})
export class TimesheetLoginComponent implements OnInit {

  empEmail:string="";
  empPassword:string="";
  message:string="";
  btnStatus:boolean=false;
  sessionEmail:string="";
  constructor(private http:Http, private backController:BackControllerService, private sessionToken: SessionTokenService,
    private navigate: AppNavigationService) { }

  ngOnInit() {
    this.empEmail=''; 
    this.empPassword='';
  }
  forgotPass(){
    this.navigate.forgotPass();
  }

  onLoginEmp(form : NgForm) {
    if(form.invalid) 
    { 
      if(form.value.empEmail == "" && form.value.empPassword != "")
      {
        this.message = "Please enter email id";
      }
      else if(form.value.empEmail != "" && form.value.empPassword == "")
      {
        this.message = "Please enter password";
      }
      else
      {
        this.message = "Please enter valid email id.";
      } 
      this.btnStatus = true;
      return; 
    }
    console.log(form.value.empEmail);
    var employee : Employee = {emailId:form.value.empEmail, password:'', empId: 0, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ValidateEmployeeCredentials/LoginCheck', employee).subscribe(result => { console.log(result);
    if(CryptoJS.AES.decrypt(result['_body'], 'leap2018').toString(CryptoJS.enc.Utf8) === form.value.empPassword)
    {
      var employee : Employee = {emailId:form.value.empEmail, password:'', empId: 0, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/GetEmployeeId/RetrieveEmployee', employee)
      .subscribe((data)=>{ 
        this.sessionToken.sendToken(CryptoJS.AES.encrypt(data['_body'], 'leap2018').toString());
        this.navigate.home();  
      });
     
    }
    else
    {
      this.btnStatus = true;
      this.message = "Incorrect email id and password. Please try again.";
      form.value.empEmail = '';
      form.value.empPassword = '';
      this.navigate.login();
    };
  });
  this.btnStatus = true;
  };
}
