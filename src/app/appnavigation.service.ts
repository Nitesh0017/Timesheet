import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  constructor(private router: Router) {   }

  login(){
    this.router.navigate(['login']);
  }

  forgotPass(){
    this.router.navigate(['forgotPass']);
  }

  home(){
    this.router.navigate(['home/myReports']);
  }

  addTimesheet(year,month,date){
    this.router.navigate(['home/addTimesheet',year, month,date]);
  }

  editTimesheet(timesheetWeek:any)
  {
    this.router.navigate(['home/editTimesheet',timesheetWeek]);
  }

  viewTimesheet()
  {
    this.router.navigate(['home/viewTimesheet']);
  }

}
