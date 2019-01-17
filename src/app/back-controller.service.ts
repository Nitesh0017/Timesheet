import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Employee} from './employee.model';
import {Timesheet} from './Timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class BackControllerService {

  status:string;
  constructor(private http: HttpClient) { }
  login(emailId:string): Observable<Employee> 
  {
    var employee : Employee = {emailId:emailId, password:'', empId: 0, empName: "",IsRM:0};
    return this.http.post<Employee>('http://apimicro.trasers.com/TestAPI/api/GetEmployeeId/RetrieveEmployee', employee);
  }
  isRM(empId:number): Observable<Employee> 
  {
    var employee : Employee = {emailId:'', password:'', empId:empId, empName: "",IsRM:0};
    return this.http.post<Employee>('http://apimicro.trasers.com/TestAPI/api/IsEmployeeRM/IsRM', employee);
  }
  getEmployeeDetails(empId:number): Observable<Employee> 
  {
    var employee : Employee = {emailId:'', password:'', empId:empId, empName: "",IsRM:0};
    return this.http.post<Employee>('http://apimicro.trasers.com/TestAPI/api/RetrieveEmployeeDetails/details', employee);
  }
  viewDeleteRefreshTimesheet(empId:number): Observable<Timesheet>
  {
    var employee : Employee = {emailId:'', password:'', empId: empId, empName: "",IsRM:0};
    return this.http.post<Timesheet>('http://apimicro.trasers.com/TestAPI/api/ViewTimesheet/view', employee);
  }
}
