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
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css']
})
export class AddTimesheetComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router,
    private navigate:AppNavigationService, private session:SessionTokenService) { }
  month;   year;   day;   date;   day_of_week;
  startDate:number;
  endDate: number;
  firstDay;firstDate: number=0; firstMonth: number=0; firstYear: number=0;
  secondDay;secondDate: number=0; secondMonth: number=0; secondYear: number=0;
  thirdDay;thirdDate: number=0;   thirdMonth: number=0; thirdYear: number=0;
  fourthDay; fourthDate: number=0; fourthMonth: number=0;  fourthYear: number=0;
  fifthDay;fifthDate: number=0;  fifthMonth: number=0;  fifthYear: number=0;
  sixthDay;sixthDate: number=0;  sixthMonth: number=0;  sixthYear: number=0;
  seventhDay;seventhDate: number=0;  seventhMonth: number=0; seventhYear: number=0;
  empId:string;
  empIdNum: number;
  encryptedEmpId: string;
  httpdata;
  date1; date2; date3; date4; date5; date6; date7;
  selectHour11;selectHour12;selectHour13;selectHour14;selectHour15;selectHour16;selectHour17;
  selectHour21;selectHour22;selectHour23;selectHour24;selectHour25;selectHour26;selectHour27;
  selectHour31;selectHour32;selectHour33;selectHour34;selectHour35;selectHour36;selectHour37;
  selectHour41;selectHour42;selectHour43;selectHour44;selectHour45;selectHour46;selectHour47;
  selectHour51;selectHour52;selectHour53;selectHour54;selectHour55;selectHour56;selectHour57;
  selectHour61;selectHour62;selectHour63;selectHour64;selectHour65;selectHour66;selectHour67;
  selectHour71;selectHour72;selectHour73;selectHour74;selectHour75;selectHour76;selectHour77;
  selectHour81;selectHour82;selectHour83;selectHour84;selectHour85;selectHour86;selectHour87;
  selectHour91;selectHour92;selectHour93;selectHour94;selectHour95;selectHour96;selectHour97;
  selectHour101;selectHour102;selectHour103;selectHour104;selectHour105;selectHour106;selectHour107;
  selectHour111;selectHour112;selectHour113;selectHour114;selectHour115;selectHour116;selectHour117;
  selectHour121;selectHour122;selectHour123;selectHour124;selectHour125;selectHour126;selectHour127;
  selectHour131;selectHour132;selectHour133;selectHour134;selectHour135;selectHour136;selectHour137;
  selectHour141;selectHour142;selectHour143;selectHour144;selectHour145;selectHour146;selectHour147;
  selectHour151;selectHour152;selectHour153;selectHour154;selectHour155;selectHour156;selectHour157;
  selectHour161;selectHour162;selectHour163;selectHour164;selectHour165;selectHour166;selectHour167;
  selectHour171;selectHour172;selectHour173;selectHour174;selectHour175;selectHour176;selectHour177;
  selectHour181;selectHour182;selectHour183;selectHour184;selectHour185;selectHour186;selectHour187;
  selectedValue1;selectedValue2;selectedValue3;selectedValue4;selectedValue5;selectedValue6;
  selectedValue7;selectedValue8;selectedValue9;selectedValue10;selectedValue11;selectedValue12;
  selectedValue13;selectedValue14;selectedValue15;selectedValue16;selectedValue17;selectedValue18;
  hoursSpent:any=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  one:boolean; two: boolean; three: boolean; four: boolean; five:boolean; six:boolean; seven:boolean; eight:boolean; nine:boolean; ten:boolean; eleven:boolean; 
  twelve:boolean; thirteen:boolean; fourteen:boolean; fifteen:boolean; sixteen:boolean; seventeen:boolean; eighteen:boolean;
  weekHours: number=0; messageStatus:boolean; submitMessage:string; day1WorkHours: number=0;  day2WorkHours: number=0;   day3WorkHours: number=0;  
  day4WorkHours: number=0; day5WorkHours: number=0; day6WorkHours: number=0;  day7WorkHours: number=0;
  displaydata(data) {this.httpdata = data;  }  
  timesheetWeek: string= this.firstDate+'/'+this.firstMonth+'/'+this.firstYear+'--'+this.seventhDate+'/'+this.seventhMonth+'/'+this.seventhYear;
  weekStart: string; weekEnd: string; workDescription1: string;workDescription2: string;workDescription3: string;workDescription4: string;workDescription5: string;workDescription6: string;
  workDescription7: string;workDescription8: string;workDescription9: string;workDescription10: string;workDescription11: string;workDescription12: string;
  workDescription13: string;workDescription14: string;workDescription15: string;workDescription16: string;workDescription17: string;workDescription18: string;
  dateSupplied: Date;
  datex:number; datey:string; monthx:number; monthy: string; daten: Date; dateq:string;
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
    this.year= this.activatedRoute.snapshot.paramMap.get('id1');
    this.month= this.activatedRoute.snapshot.paramMap.get('id2');
    this.day= this.activatedRoute.snapshot.paramMap.get('id3');
    this.day = parseInt(this.day);
    this.month = parseInt(this.month);
    this.year = parseInt(this.year);
    this.selectHour11=0;this.selectHour12=0;this.selectHour13=0;this.selectHour14=0;this.selectHour15=0;this.selectHour16=0;this.selectHour17=0;
      this.selectHour21=0;this.selectHour22=0;this.selectHour23=0;this.selectHour24=0;this.selectHour25=0;this.selectHour26=0;this.selectHour27=0;
      this.selectHour31=0;this.selectHour32=0;this.selectHour33=0;this.selectHour34=0;this.selectHour35=0;this.selectHour36=0;this.selectHour37=0;
      this.selectHour41=0;this.selectHour42=0;this.selectHour43=0;this.selectHour44=0;this.selectHour45=0;this.selectHour46=0;this.selectHour47=0;
      this.selectHour51=0;this.selectHour52=0;this.selectHour53=0;this.selectHour54=0;this.selectHour55=0;this.selectHour56=0;this.selectHour57=0;
      this.selectHour61=0;this.selectHour62=0;this.selectHour63=0;this.selectHour64=0;this.selectHour65=0;this.selectHour66=0;this.selectHour67=0;
      this.selectHour71=0;this.selectHour72=0;this.selectHour73=0;this.selectHour74=0;this.selectHour75=0;this.selectHour76=0;this.selectHour77=0;
      this.selectHour81=0;this.selectHour82=0;this.selectHour83=0;this.selectHour84=0;this.selectHour85=0;this.selectHour86=0;this.selectHour87=0;
      this.selectHour91=0;this.selectHour92=0;this.selectHour93=0;this.selectHour94=0;this.selectHour95=0;this.selectHour96=0;this.selectHour97=0;
      this.selectHour101=0;this.selectHour102=0;this.selectHour103=0;this.selectHour104=0;this.selectHour105=0;this.selectHour106=0;this.selectHour107=0;
      this.selectHour111=0;this.selectHour112=0;this.selectHour113=0;this.selectHour114=0;this.selectHour115=0;this.selectHour116=0;this.selectHour117=0;
      this.selectHour121=0;this.selectHour122=0;this.selectHour123=0;this.selectHour124=0;this.selectHour125=0;this.selectHour126=0;this.selectHour127=0;
      this.selectHour131=0;this.selectHour132=0;this.selectHour133=0;this.selectHour134=0;this.selectHour135=0;this.selectHour136=0;this.selectHour137=0;
      this.selectHour141=0;this.selectHour142=0;this.selectHour143=0;this.selectHour144=0;this.selectHour145=0;this.selectHour146=0;this.selectHour147=0;
      this.selectHour151=0;this.selectHour152=0;this.selectHour153=0;this.selectHour154=0;this.selectHour155=0;this.selectHour156=0;this.selectHour157=0;
      this.selectHour161=0;this.selectHour162=0;this.selectHour163=0;this.selectHour164=0;this.selectHour165=0;this.selectHour166=0;this.selectHour167=0;
      this.selectHour171=0;this.selectHour172=0;this.selectHour173=0;this.selectHour174=0;this.selectHour175=0;this.selectHour176=0;this.selectHour177=0;
      this.selectHour181=0;this.selectHour182=0;this.selectHour183=0;this.selectHour184=0;this.selectHour185=0;this.selectHour186=0;this.selectHour187=0;
    this.selectedValue1="";this.selectedValue2="";this.selectedValue3="";this.selectedValue4="";this.selectedValue5="";this.selectedValue6="";
    this.selectedValue7="";this.selectedValue8="";this.selectedValue9="";this.selectedValue10="";this.selectedValue11="";this.selectedValue12="";
    this.selectedValue13="";this.selectedValue14="";this.selectedValue15="";this.selectedValue16="";this.selectedValue17="";this.selectedValue18="";
    
    this.workDescription1="";this.workDescription2="";this.workDescription3="";this.workDescription4="";
      this.workDescription5="";this.workDescription6="";
      this.workDescription7="";this.workDescription8="";this.workDescription9="";this.workDescription10="";
      this.workDescription11="";this.workDescription12="";
      this.workDescription13="";this.workDescription14="";this.workDescription15="";this.workDescription16="";
      this.workDescription17="";this.workDescription18="";
      this.two=true; this.one=true; this.three=true; this.four=true;
    this.five=false; this.six=false; this.seven=false; this.eight=false; this.nine=false; this.ten=false; this.eleven=false; 
    this.twelve=false; this.thirteen=false; this.fourteen=false; this.fifteen=false; this.sixteen=false; this.seventeen=false; this.eighteen=false;
    var employee1 : Employee = {emailId:'', password:'', empId: this.empIdNum, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveEmployeeDetails/details', employee1).
    pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayEmployeesDetails(data); });
    
    this.dateq = this.year + "-" + this.month + "-" + this.day;
    this.date = this.year + "-" + this.month + "-" + this.day;
    let date = new Date(this.date);
    this.dateSupplied= date;
    this.day_of_week = date.getDay();
    if(this.day_of_week == 1)                 //Monday
    {
      console.log("Monday");
      this.startDate=this.day;
      if(((parseInt(this.day)+6<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)) || ((parseInt(this.day)+6<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+6<=28)&&(parseInt(this.month)==2)))
      {
        console.log("No issue");
        this.endDate=parseInt(this.day)+6;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11 || parseInt(this.month)==2)
        {
          this.endDate = parseInt(this.day)-24;
        }
        else if(parseInt(this.month)==1  || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-25;
        }
        else
        {
          this.endDate = parseInt(this.day)-22;
        }
       
      }
    }
    else if(this.day_of_week == 2)               //Tuesday
    {
      console.log("Tuesday");
      if(((parseInt(this.day)-1>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-1>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-1>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-1;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11|| parseInt(this.month)==2)
        {
          this.startDate=30;
        }
        else if(parseInt(this.month)==1 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=31;
        }
        else
        {
          this.startDate=28;
        }
      }
      if(((parseInt(this.day)+5<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+5<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+5<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+5;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-25;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-26;
        }
        else
        {
          this.endDate = parseInt(this.day)-23;
        }
      }
    }
    else if(this.day_of_week == 3)        //Wednesday
    {
      console.log("Wednesday");
      if(((parseInt(this.day)-2>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-2>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-2>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-2;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11|| parseInt(this.month)==2)
        {
          this.startDate=parseInt(this.day)+29;
        }
        else if(parseInt(this.month)==12 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10)
        {
          this.startDate=parseInt(this.day)+30;
        }
        else if(parseInt(this.month)==1)
        {
          this.startDate=parseInt(this.day)+29;
        }
        else
        {
          this.startDate=parseInt(this.day)+27;
        }
      }
      if(((parseInt(this.day)+4<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+4<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+4<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+4;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-26;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-27;
        }
        else
        {
          this.endDate = parseInt(this.day)-24;
        }
      }
    }
    else if(this.day_of_week == 4)            //Thursday
    {
      console.log("Thursday");
      if(((parseInt(this.day)-3>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-3>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-3>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-3;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11 || parseInt(this.month)==2)
        {
          this.startDate=parseInt(this.day)+28;
        }
        else if(parseInt(this.month)==12 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10)
        {
          this.startDate=parseInt(this.day)+29;
        }
        else if(parseInt(this.month)==1)
        {
          this.startDate=parseInt(this.day)+28;
        }
        else
        {
          this.startDate=parseInt(this.day)+26;
        }
      }
      if(((parseInt(this.day)+3<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+3<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+3<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+3;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-27;
        }
        else if(parseInt(this.month)==1 || parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-28;
        }
        else
        {
          this.endDate = parseInt(this.day)-25;
        }
      }
    }
    else if(this.day_of_week == 5) //Friday
    {
      console.log("Friday");
      if(((parseInt(this.day)-4>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-4>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-4>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-4;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11 || parseInt(this.month)==2)
        {
          this.startDate=parseInt(this.day)+27;
        }
        else if(parseInt(this.month)==12 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10)
        {
          this.startDate=parseInt(this.day)+26;
        }
        else if(parseInt(this.month)==1)
        {
          this.startDate=parseInt(this.day)+27;
        }
        else
        {
          this.startDate=parseInt(this.day)+25;
        }
      }
      if(((parseInt(this.day)+2<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+2<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+2<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+2;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-28;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-29;
        }
        else
        {
          this.endDate = parseInt(this.day)-26;
        }
      }
    }
    else if(this.day_of_week == 6)        //Saturday
    {
      console.log("Saturday");
      if(((parseInt(this.day)-5>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-5>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-5>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-5;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11 || parseInt(this.month)==2)
        {
          this.startDate=parseInt(this.day)+26;
        }
        else if(parseInt(this.month)==12 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10)
        {
          this.startDate=parseInt(this.day)+25;
        }
        else if(parseInt(this.month)==1)
        {
          this.startDate=parseInt(this.day)+26;
        }
        else
        {
          this.startDate=parseInt(this.day)+24;
        }
      }
      if(((parseInt(this.day)+1<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+1<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+1<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+1;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-29;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-30;
        }
        else
        {
          this.endDate = parseInt(this.day)-27;
        }
      }
    }
    else if(this.day_of_week == 0)      //Sunday
    {
      console.log("Sunday");
      if(((parseInt(this.day)-6>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-6>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-6>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-6;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11 || parseInt(this.month)==2)
        {
          this.startDate=parseInt(this.day)+25;
        }
        else if(parseInt(this.month)==12 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10)
        {
          this.startDate=parseInt(this.day)+24;
        }
        else if(parseInt(this.month)==1)
        {
          this.startDate=parseInt(this.day)+25;
        }
        else
        {
          this.startDate=parseInt(this.day)+23;
        }
      }
      this.endDate=parseInt(this.day);
      
    }

    this.firstDate= this.startDate;
    if(parseInt(this.day)<this.firstDate)
    {
      if(parseInt(this.month)==1)  {
      this.firstYear = parseInt(this.year)-1;
      this.firstMonth = 12;
      }
      else{
      this.firstYear = parseInt(this.year);
      this.firstMonth = parseInt(this.month)-1;
      }
    }
    else
    {
      this.firstYear = parseInt(this.year);
      this.firstMonth = parseInt(this.month);
    }
    console.log(this.firstDate);
    this.secondDate = this.firstDate+1;         //secondDate
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.secondDate>30)
      {
        this.secondDate= this.firstDate-29;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 || this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 ||this.firstMonth==10 || this.firstMonth==12)
        {
          if(this.secondDate>31)
          {
            this.secondDate= this.firstDate-30;
          }
        }
    else
        {
          if(this.secondDate>28)
          {
            this.secondDate= this.firstDate-27;
          }
        }   
    if(this.secondDate>parseInt(this.day)+7)    // 2nd date 30 & day 1
    {
      if(parseInt(this.month)==1)  {
      this.secondYear = parseInt(this.year)-1;
      this.secondMonth = 12
      }
      else
      {
      this.secondYear = parseInt(this.year);
      this.secondMonth = parseInt(this.month)-1;
      }
    }
    else if(this.secondDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.secondYear = parseInt(this.year)+1;
      this.secondMonth = 1;
      }
      else
      this.secondYear = parseInt(this.year);
      this.secondMonth = parseInt(this.month)+1;
    }
    else
    {
      this.secondYear = parseInt(this.year);
      this.secondMonth = parseInt(this.month);
    }
    console.log(this.secondDate);
    this.thirdDate =this.firstDate+2;         //thirdDate
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 ||this.firstMonth==11)
    {
      if(this.thirdDate>30)
      {
        this.thirdDate= this.firstDate-28;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 || this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 ||this.firstMonth==12)
        {
          if(this.thirdDate>31)
          {
            this.thirdDate=this.firstDate-29;
          }
        }
    else
        {
          if(this.thirdDate>28)
          {
            this.thirdDate= this.firstDate-26;
          }
        }   
    if(this.thirdDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.thirdYear = parseInt(this.year)-1;
      else
      this.thirdYear = parseInt(this.year);
      this.thirdMonth = parseInt(this.month)-1;
    }
    else if(this.thirdDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.thirdYear = parseInt(this.year)+1;
      this.thirdMonth = 1;
      }
      else
      this.thirdYear = parseInt(this.year);
      this.thirdMonth = parseInt(this.month)+1;
    }
    else
    {
      this.thirdYear = parseInt(this.year);
      this.thirdMonth = parseInt(this.month);
    }
    console.log(this.thirdDate);
    this.fourthDate = this.firstDate+3;         //fourth Date
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.fourthDate>30)
      {
        this.fourthDate= this.firstDate-27;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 ||this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 || this.firstMonth==12)
        {
          if(this.fourthDate>31)
          {
            this.fourthDate= this.firstDate-28;
          }
        }
    else
        {
          if(this.fourthDate>28)
          {
            this.fourthDate=this.firstDate-25;
          }
        }   
    if(this.fourthDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.fourthYear = parseInt(this.year)-1;
      else
      this.fourthYear = parseInt(this.year);
      this.fourthMonth = parseInt(this.month)-1;
    }
    else if(this.fourthDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.fourthYear = parseInt(this.year)+1;
      this.fourthMonth = 1;
      }
      else
      this.fourthYear = parseInt(this.year);
      this.fourthMonth = parseInt(this.month)+1;
    }
    else
    {
      this.fourthYear = parseInt(this.year);
      this.fourthMonth = parseInt(this.month);
    }
    console.log(this.fourthDate);
    this.fifthDate = this.firstDate+4;         //fifth Date
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.fifthDate>30)
      {
        this.fifthDate= this.firstDate-26;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 || this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 || this.firstMonth==12)
        {
          if(this.fifthDate>31)
          {
            this.fifthDate= this.firstDate-27;
          }
        }
    else
        {
          if(this.fifthDate>28)
          {
            this.fifthDate= this.firstDate-24;
          }
        }   
    if(this.fifthDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.fifthYear = parseInt(this.year)-1;
      else
      this.fifthYear = parseInt(this.year);
      this.fifthMonth = parseInt(this.month)-1;
    }
    else if(this.fifthDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.fifthYear = parseInt(this.year)+1;
      this.fifthMonth = 1;
      }
      else
      this.fifthYear = parseInt(this.year);
      this.fifthMonth = parseInt(this.month)+1;
    }
    else
    {
      this.fifthYear = parseInt(this.year);
      this.fifthMonth = parseInt(this.month);
    }
    console.log(this.fifthDate);
    this.sixthDate = this.firstDate+5;         //fifth Date
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.sixthDate>30)
      {
        this.sixthDate= this.firstDate-25;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 || this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 || this.firstMonth==12)
        {
          if(this.sixthDate>31)
          {
            this.sixthDate= this.firstDate-26;
          }
        }
    else
        {
          if(this.sixthDate>28)
          {
            this.sixthDate= this.firstDate-23;
          }
        }   
    if(this.sixthDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.sixthYear = parseInt(this.year)-1;
      else
      this.sixthYear = parseInt(this.year);
      this.sixthMonth = parseInt(this.month)-1;
    }
    else if(this.sixthDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.sixthYear = parseInt(this.year)+1;
      this.sixthMonth = 1;
      }
      else
      this.sixthYear = parseInt(this.year);
      this.sixthMonth = parseInt(this.month)+1;
    }
    else
    {
      this.sixthYear = parseInt(this.year);
      this.sixthMonth = parseInt(this.month);
    }
    console.log(this.sixthDate);
    this.seventhDate = this.firstDate+6;         //fifth Date
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.seventhDate>30)
      {
        this.seventhDate= this.firstDate-24;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 ||this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 ||this.firstMonth==12)
        {
          if(this.seventhDate>31)
          {
            this.seventhDate= this.firstDate-25;
          }
        }
    else
        {
          if(this.seventhDate>28)
          {
            this.seventhDate= this.firstDate-22;
          }
        }   
    if(this.seventhDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.seventhYear = parseInt(this.year)-1;
      else
      this.seventhYear = parseInt(this.year);
      this.seventhMonth = parseInt(this.month)-1;
    }
    else if(this.seventhDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.seventhYear = parseInt(this.year)+1;
      this.seventhMonth = 1;
      }
      else
      this.seventhYear = parseInt(this.year);
      this.seventhMonth = parseInt(this.month)+1;
    }
    else
    {
      this.seventhYear = parseInt(this.year);
      this.seventhMonth = parseInt(this.month);
    }
    console.log(this.seventhDate);
    this.date1 = this.firstYear + "-" + this.firstMonth + "-" + this.firstDate;
    this.weekStart = this.date1;
    this.date1 = new Date(this.date1);
    this.firstDay = this.getDayName(this.date1.getDay());
    console.log(this.date1);

    this.date2 = this.secondYear + "-" + this.secondMonth + "-" + this.secondDate;
    this.date2 = new Date(this.date2);
    this.secondDay = this.getDayName(this.date2.getDay());

    this.date3 = this.thirdYear + "-" + this.thirdMonth + "-" + this.thirdDate;
    this.date3 = new Date(this.date3);
    this.thirdDay = this.getDayName(this.date3.getDay());

    this.date4 = this.fourthYear + "-" + this.fourthMonth + "-" + this.fourthDate;
    this.date4 = new Date(this.date4);
    this.fourthDay = this.getDayName(this.date4.getDay());

    this.date5 = this.fifthYear + "-" + this.fifthMonth + "-" + this.fifthDate;
    this.date5 = new Date(this.date5);
    this.fifthDay = this.getDayName(this.date5.getDay());

    this.date6 = this.sixthYear + "-" + this.sixthMonth + "-" + this.sixthDate;
    this.date6 = new Date(this.date6);
    this.sixthDay = this.getDayName(this.date6.getDay());

    this.date7 = this.seventhYear + "-" + this.seventhMonth + "-" + this.seventhDate;
    this.weekEnd = this.date7;
    this.date7 = new Date(this.date7);
    this.seventhDay = this.getDayName(this.date7.getDay());

    var timesheet1 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue1,timesheet1Date:this.date1, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    
    this.http.post('http://apimicro.trasers.com/TestAPI/api/ProjectEmployeeMapped/viewProjectId', timesheet1).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaydata(data); });
    
  }

  getDayName(id: number)
  {
    if(id==0)
    {
        return 'Sunday';
    }
    else if(id==1)
    {
        return 'Monday';
    }
    else if(id==2)
    {
        return 'Tuesday';
    }
    else if(id==3)
    {
        return 'Wednesday';
    }
    else if(id==4)
    {
        return 'Thursday';
    }
    else if(id==5)
    {
        return 'Friday';
    }
    else
    {
        return 'Saturday';
    }
  }

  deleteRow(num: number){
    if(num ==1){
      this.one=false;
      this.selectHour11=0;this.selectHour12=0;this.selectHour13=0;this.selectHour14=0;this.selectHour15=0;
      this.selectHour16=0;this.selectHour17=0;this.selectedValue1="";this.workDescription1="";
    }
    if(num ==2)
    {
      this.two =false;
      this.selectHour21=0;this.selectHour22=0;this.selectHour23=0;this.selectHour24=0;this.selectHour25=0;
      this.selectHour26=0;this.selectHour27=0;this.selectedValue2="";this.workDescription2="";
    }
    if(num ==3)
    {
      this.three =false;
      this.selectHour31=0;this.selectHour32=0;this.selectHour33=0;this.selectHour34=0;this.selectHour35=0;
      this.selectHour36=0;this.selectHour37=0;this.selectedValue3="";this.workDescription3="";
    }
    if(num ==4)
    {
      this.four =false;
      this.selectHour41=0;this.selectHour42=0;this.selectHour43=0;this.selectHour44=0;this.selectHour45=0;
      this.selectHour46=0;this.selectHour47=0;this.selectedValue4="";this.workDescription4="";
    }
    if(num ==5)
    {
      this.five =false;
      this.selectHour51=0;this.selectHour52=0;this.selectHour53=0;this.selectHour54=0;this.selectHour55=0;
      this.selectHour56=0;this.selectHour57=0;this.selectedValue5="";this.workDescription5="";
    }
    if(num ==6)
    {
      this.six =false;
      this.selectHour61=0;this.selectHour62=0;this.selectHour63=0;this.selectHour64=0;this.selectHour65=0;
      this.selectHour66=0;this.selectHour67=0;this.selectedValue6="";this.workDescription6="";
    }
    if(num ==7)
    {
      this.seven =false;
      this.selectHour71=0;this.selectHour72=0;this.selectHour73=0;this.selectHour74=0;this.selectHour75=0;
      this.selectHour76=0;this.selectHour77=0;this.selectedValue7="";this.workDescription7="";
    }
    if(num ==8)
    {
      this.eight =false;
      this.selectHour81=0;this.selectHour82=0;this.selectHour83=0;this.selectHour84=0;this.selectHour85=0;
      this.selectHour86=0;this.selectHour87=0;this.selectedValue8="";this.workDescription8="";
    }
    if(num ==9)
    {
      this.nine =false;
      this.selectHour91=0;this.selectHour92=0;this.selectHour93=0;this.selectHour94=0;this.selectHour95=0;
      this.selectHour96=0;this.selectHour97=0;this.selectedValue9="";this.workDescription9="";
    }
    if(num ==10)
    {
      this.ten =false;
      this.selectHour101=0;this.selectHour102=0;this.selectHour103=0;this.selectHour104=0;this.selectHour105=0;
      this.selectHour106=0;this.selectHour107=0;this.selectedValue10="";this.workDescription10="";
    }
    if(num ==11)
    {
      this.eleven =false;
      this.selectHour111=0;this.selectHour112=0;this.selectHour113=0;this.selectHour114=0;this.selectHour115=0;
      this.selectHour116=0;this.selectHour117=0;this.selectedValue11="";this.workDescription11="";
    }
    if(num ==12)
    {
      this.twelve =false;
      this.selectHour121=0;this.selectHour122=0;this.selectHour123=0;this.selectHour124=0;this.selectHour125=0;
      this.selectHour126=0;this.selectHour127=0;this.selectedValue12="";this.workDescription12="";
    }
    if(num ==13)
    {
      this.thirteen =false;
      this.selectHour131=0;this.selectHour132=0;this.selectHour133=0;this.selectHour134=0;this.selectHour135=0;
      this.selectHour136=0;this.selectHour137=0;this.selectedValue13="";this.workDescription13="";
    }
    if(num ==14)
    {
      this.fourteen =false; 
      this.selectHour141=0;this.selectHour142=0;this.selectHour143=0;this.selectHour144=0;this.selectHour145=0;
      this.selectHour146=0;this.selectHour147=0;this.selectedValue14="";this.workDescription14="";
    }
    if(num ==15)
    {
      this.fifteen =false; 
      this.selectHour151=0;this.selectHour152=0;this.selectHour153=0;this.selectHour154=0;this.selectHour155=0;
      this.selectHour156=0;this.selectHour157=0;this.selectedValue15="";this.workDescription15="";
    }
    if(num ==16)
    {
      this.sixteen =false; 
      this.selectHour161=0;this.selectHour162=0;this.selectHour163=0;this.selectHour164=0;this.selectHour165=0;
      this.selectHour166=0;this.selectHour167=0;this.selectedValue16="";this.workDescription16="";
    }
    if(num ==17)
    {
      this.seventeen =false;
      this.selectHour171=0;this.selectHour172=0;this.selectHour173=0;this.selectHour174=0;this.selectHour175=0;
      this.selectHour176=0;this.selectHour177=0;this.selectedValue17="";this.workDescription17="";
    }
    if(num ==18)
    {
      this.eighteen =false; 
      this.selectHour181=0;this.selectHour182=0;this.selectHour183=0;this.selectHour184=0;this.selectHour185=0;
      this.selectHour186=0;this.selectHour187=0;this.selectedValue18="";this.workDescription18="";
    }

  }

  submit()
  {
    console.log("Submit method");
      if(this.selectHour11!=0)
      {
        this.weekHours += parseInt(this.selectHour11);
        this.day1WorkHours += parseInt(this.selectHour11);
      }
      if(this.selectHour12!=0)
      {
        this.weekHours += parseInt(this.selectHour12);
        this.day2WorkHours += parseInt(this.selectHour12);
      }
      if(this.selectHour13!=0)
      {
        this.weekHours += parseInt(this.selectHour13);
        this.day3WorkHours += parseInt(this.selectHour13);
      }
      if(this.selectHour14!=0)
      {
        this.weekHours += parseInt(this.selectHour14);
        this.day4WorkHours += parseInt(this.selectHour14);
      }
      if(this.selectHour15!=0)
      {
        this.weekHours += parseInt(this.selectHour15);
        this.day5WorkHours += parseInt(this.selectHour15);
      }
      if(this.selectHour16!=0)
      {
        this.weekHours += parseInt(this.selectHour16);
        this.day6WorkHours += parseInt(this.selectHour16);
      }
      if(this.selectHour17!=0)
      {
        this.weekHours += parseInt(this.selectHour17);
        this.day7WorkHours += parseInt(this.selectHour17);
      }
    if(this.selectHour21!=0)
      {
        this.weekHours += parseInt(this.selectHour21);
        this.day1WorkHours += parseInt(this.selectHour21);
      }
      if(this.selectHour22!=0)
      {
        this.weekHours += parseInt(this.selectHour22);
        this.day2WorkHours += parseInt(this.selectHour22);
      }
      if(this.selectHour23!=0)
      {
        this.weekHours += parseInt(this.selectHour23);
        this.day3WorkHours += parseInt(this.selectHour23);
      }
      if(this.selectHour24!=0)
      {
        this.weekHours += parseInt(this.selectHour24);
        this.day4WorkHours += parseInt(this.selectHour24);
      }
      if(this.selectHour25!=0)
      {
        this.weekHours += parseInt(this.selectHour25);
        this.day5WorkHours += parseInt(this.selectHour25);
      }
      if(this.selectHour26!=0)
      {
        this.weekHours += parseInt(this.selectHour26);
        this.day6WorkHours += parseInt(this.selectHour26);
      }
      if(this.selectHour27!=0)
      {
        this.weekHours += parseInt(this.selectHour27);
        this.day7WorkHours += parseInt(this.selectHour27);
      }if(this.selectHour31!=0)
      {
        this.weekHours += parseInt(this.selectHour31);
        this.day1WorkHours += parseInt(this.selectHour31);       
      }
      if(this.selectHour32!=0)
      {
        this.weekHours += parseInt(this.selectHour32);
        this.day2WorkHours += parseInt(this.selectHour32);
      }
      if(this.selectHour33!=0)
      {
        this.weekHours += parseInt(this.selectHour33);
        this.day3WorkHours += parseInt(this.selectHour33);
      }
      if(this.selectHour34!=0)
      {
        this.weekHours += parseInt(this.selectHour34);
        this.day4WorkHours += parseInt(this.selectHour34);
      }
      if(this.selectHour35!=0)
      {
        this.weekHours += parseInt(this.selectHour35);
        this.day5WorkHours += parseInt(this.selectHour35);
      }
      if(this.selectHour36!=0)
      {
        this.weekHours += parseInt(this.selectHour36);
        this.day6WorkHours += parseInt(this.selectHour36);
      }
      if(this.selectHour37!=0)
      {
        this.weekHours += parseInt(this.selectHour37);
        this.day7WorkHours += parseInt(this.selectHour37);
      }
    if(this.selectHour41!=0)
      {
        this.weekHours += parseInt(this.selectHour41);
        this.day1WorkHours += parseInt(this.selectHour41);
      }
      if(this.selectHour42!=0)
      {
        this.weekHours += parseInt(this.selectHour42);
        this.day2WorkHours += parseInt(this.selectHour42);
      }
      if(this.selectHour43!=0)
      {
        this.weekHours += parseInt(this.selectHour43);
        this.day3WorkHours += parseInt(this.selectHour43);
      }
      if(this.selectHour44!=0)
      {
        this.weekHours += parseInt(this.selectHour44);
        this.day4WorkHours += parseInt(this.selectHour44);
      }
      if(this.selectHour45!=0)
      {
        this.weekHours += parseInt(this.selectHour45);
        this.day5WorkHours += parseInt(this.selectHour45);
      }
      if(this.selectHour46!=0)
      {
        this.weekHours += parseInt(this.selectHour46);
        this.day6WorkHours += parseInt(this.selectHour46);
      }
      if(this.selectHour47!=0)
      {
        this.weekHours += parseInt(this.selectHour47);
        this.day7WorkHours += parseInt(this.selectHour47);
      }
      if(this.selectHour51!=0)
      {
        this.weekHours += parseInt(this.selectHour51);
        this.day1WorkHours += parseInt(this.selectHour51);
      }
      if(this.selectHour52!=0)
      {
        this.weekHours += parseInt(this.selectHour52);
        this.day2WorkHours += parseInt(this.selectHour52);
      }
      if(this.selectHour53!=0)
      {
        this.weekHours += parseInt(this.selectHour53);
        this.day3WorkHours += parseInt(this.selectHour53);
      }
      if(this.selectHour54!=0)
      {
        this.weekHours += parseInt(this.selectHour54);
        this.day4WorkHours += parseInt(this.selectHour54);
      }
      if(this.selectHour55!=0)
      {
        this.weekHours += parseInt(this.selectHour55);
        this.day5WorkHours += parseInt(this.selectHour55);
      }
      if(this.selectHour56!=0)
      {
        this.weekHours += parseInt(this.selectHour56);
        this.day6WorkHours += parseInt(this.selectHour56);
      }
      if(this.selectHour57!=0)
      {
        this.weekHours += parseInt(this.selectHour57);
        this.day7WorkHours += parseInt(this.selectHour57);
      }
    if(this.selectHour61!=0)
      {
        this.weekHours += parseInt(this.selectHour61);
        this.day1WorkHours += parseInt(this.selectHour61);
      }
      if(this.selectHour62!=0)
      {
        this.weekHours += parseInt(this.selectHour62);
        this.day2WorkHours += parseInt(this.selectHour62);
      }
      if(this.selectHour63!=0)
      {
        this.weekHours += parseInt(this.selectHour63);
        this.day3WorkHours += parseInt(this.selectHour63);
      }
      if(this.selectHour64!=0)
      {
        this.weekHours += parseInt(this.selectHour64);
        this.day4WorkHours += parseInt(this.selectHour64);
      }
      if(this.selectHour65!=0)
      {
        this.weekHours += parseInt(this.selectHour65);
        this.day5WorkHours += parseInt(this.selectHour65);
      }
      if(this.selectHour66!=0)
      {
        this.weekHours += parseInt(this.selectHour66);
        this.day6WorkHours += parseInt(this.selectHour66);
      }
      if(this.selectHour67!=0)
      {
        this.weekHours += parseInt(this.selectHour67);
        this.day7WorkHours += parseInt(this.selectHour67);
      }
      if(this.selectHour71!=0)
      {
        this.weekHours += parseInt(this.selectHour71);
        this.day1WorkHours += parseInt(this.selectHour71);
      }
      if(this.selectHour72!=0)
      {
        this.weekHours += parseInt(this.selectHour72);
        this.day2WorkHours += parseInt(this.selectHour72);
      }
      if(this.selectHour73!=0)
      {
        this.weekHours += parseInt(this.selectHour73);
        this.day3WorkHours += parseInt(this.selectHour73);
      }
      if(this.selectHour74!=0)
      {
        this.weekHours += parseInt(this.selectHour74);
        this.day4WorkHours += parseInt(this.selectHour74);
      }
      if(this.selectHour75!=0)
      {
        this.weekHours += parseInt(this.selectHour75);
        this.day5WorkHours += parseInt(this.selectHour75);
      }
      if(this.selectHour76!=0)
      {
        this.weekHours += parseInt(this.selectHour76);
        this.day6WorkHours += parseInt(this.selectHour76);
      }
      if(this.selectHour77!=0)
      {
        this.weekHours += parseInt(this.selectHour77);
        this.day7WorkHours += parseInt(this.selectHour77);
      }
    if(this.selectHour81!=0)
      {
        this.weekHours += parseInt(this.selectHour81);
        this.day1WorkHours += parseInt(this.selectHour81);
      }
      if(this.selectHour82!=0)
      {
        this.weekHours += parseInt(this.selectHour82);
        this.day2WorkHours += parseInt(this.selectHour82);
      }
      if(this.selectHour83!=0)
      {
        this.weekHours += parseInt(this.selectHour83);
        this.day3WorkHours += parseInt(this.selectHour83);
      }
      if(this.selectHour84!=0)
      {
        this.weekHours += parseInt(this.selectHour84);
        this.day4WorkHours += parseInt(this.selectHour84);
      }
      if(this.selectHour85!=0)
      {
        this.weekHours += parseInt(this.selectHour85);
        this.day5WorkHours += parseInt(this.selectHour85);
      }
      if(this.selectHour86!=0)
      {
        this.weekHours += parseInt(this.selectHour86);
        this.day6WorkHours += parseInt(this.selectHour86);
      }
      if(this.selectHour87!=0)
      {
        this.weekHours += parseInt(this.selectHour87);
        this.day7WorkHours += parseInt(this.selectHour87);
      }if(this.selectHour91!=0)
      {
        this.weekHours += parseInt(this.selectHour91);
        this.day1WorkHours += parseInt(this.selectHour91);       
      }
      if(this.selectHour92!=0)
      {
        this.weekHours += parseInt(this.selectHour92);
        this.day2WorkHours += parseInt(this.selectHour92);
      }
      if(this.selectHour93!=0)
      {
        this.weekHours += parseInt(this.selectHour93);
        this.day3WorkHours += parseInt(this.selectHour93);
      }
      if(this.selectHour94!=0)
      {
        this.weekHours += parseInt(this.selectHour94);
        this.day4WorkHours += parseInt(this.selectHour94);
      }
      if(this.selectHour95!=0)
      {
        this.weekHours += parseInt(this.selectHour95);
        this.day5WorkHours += parseInt(this.selectHour95);
      }
      if(this.selectHour96!=0)
      {
        this.weekHours += parseInt(this.selectHour96);
        this.day6WorkHours += parseInt(this.selectHour96);
      }
      if(this.selectHour97!=0)
      {
        this.weekHours += parseInt(this.selectHour97);
        this.day7WorkHours += parseInt(this.selectHour97);
      }
    if(this.selectHour101!=0)
      {
        this.weekHours += parseInt(this.selectHour101);
        this.day1WorkHours += parseInt(this.selectHour101);
      }
      if(this.selectHour102!=0)
      {
        this.weekHours += parseInt(this.selectHour102);
        this.day2WorkHours += parseInt(this.selectHour102);
      }
      if(this.selectHour103!=0)
      {
        this.weekHours += parseInt(this.selectHour103);
        this.day3WorkHours += parseInt(this.selectHour103);
      }
      if(this.selectHour104!=0)
      {
        this.weekHours += parseInt(this.selectHour104);
        this.day4WorkHours += parseInt(this.selectHour104);
      }
      if(this.selectHour105!=0)
      {
        this.weekHours += parseInt(this.selectHour105);
        this.day5WorkHours += parseInt(this.selectHour105);
      }
      if(this.selectHour106!=0)
      {
        this.weekHours += parseInt(this.selectHour106);
        this.day6WorkHours += parseInt(this.selectHour106);
      }
      if(this.selectHour107!=0)
      {
        this.weekHours += parseInt(this.selectHour107);
        this.day7WorkHours += parseInt(this.selectHour107);
      }
      if(this.selectHour111!=0)
      {
        this.weekHours += parseInt(this.selectHour111);
        this.day1WorkHours += parseInt(this.selectHour111);
      }
      if(this.selectHour112!=0)
      {
        this.weekHours += parseInt(this.selectHour112);
        this.day2WorkHours += parseInt(this.selectHour112);
      }
      if(this.selectHour113!=0)
      {
        this.weekHours += parseInt(this.selectHour113);
        this.day3WorkHours += parseInt(this.selectHour113);
      }
      if(this.selectHour114!=0)
      {
        this.weekHours += parseInt(this.selectHour114);
        this.day4WorkHours += parseInt(this.selectHour114);
      }
      if(this.selectHour115!=0)
      {
        this.weekHours += parseInt(this.selectHour115);
        this.day5WorkHours += parseInt(this.selectHour115);
      }
      if(this.selectHour116!=0)
      {
        this.weekHours += parseInt(this.selectHour116);
        this.day6WorkHours += parseInt(this.selectHour116);
      }
      if(this.selectHour117!=0)
      {
        this.weekHours += parseInt(this.selectHour117);
        this.day7WorkHours += parseInt(this.selectHour117);
      }
    if(this.selectHour121!=0)
      {
        this.weekHours += parseInt(this.selectHour121);
        this.day1WorkHours += parseInt(this.selectHour121);
      }
      if(this.selectHour122!=0)
      {
        this.weekHours += parseInt(this.selectHour122);
        this.day2WorkHours += parseInt(this.selectHour122);
      }
      if(this.selectHour123!=0)
      {
        this.weekHours += parseInt(this.selectHour123);
        this.day3WorkHours += parseInt(this.selectHour123);
      }
      if(this.selectHour124!=0)
      {
        this.weekHours += parseInt(this.selectHour124);
        this.day4WorkHours += parseInt(this.selectHour124);
      }
      if(this.selectHour125!=0)
      {
        this.weekHours += parseInt(this.selectHour125);
        this.day5WorkHours += parseInt(this.selectHour125);
      }
      if(this.selectHour126!=0)
      {
        this.weekHours += parseInt(this.selectHour126);
        this.day6WorkHours += parseInt(this.selectHour126);
      }
      if(this.selectHour127!=0)
      {
        this.weekHours += parseInt(this.selectHour127);
        this.day7WorkHours += parseInt(this.selectHour127);
      }
      if(this.selectHour131!=0)
      {
        this.weekHours += parseInt(this.selectHour131);
        this.day1WorkHours += parseInt(this.selectHour131);
      }
      if(this.selectHour132!=0)
      {
        this.weekHours += parseInt(this.selectHour132);
        this.day2WorkHours += parseInt(this.selectHour132);
      }
      if(this.selectHour133!=0)
      {
        this.weekHours += parseInt(this.selectHour133);
        this.day3WorkHours += parseInt(this.selectHour133);
      }
      if(this.selectHour134!=0)
      {
        this.weekHours += parseInt(this.selectHour134);
        this.day4WorkHours += parseInt(this.selectHour134);
      }
      if(this.selectHour135!=0)
      {
        this.weekHours += parseInt(this.selectHour135);
        this.day5WorkHours += parseInt(this.selectHour135);
      }
      if(this.selectHour136!=0)
      {
        this.weekHours += parseInt(this.selectHour136);
        this.day6WorkHours += parseInt(this.selectHour136);
      }
      if(this.selectHour137!=0)
      {
        this.weekHours += parseInt(this.selectHour137);
        this.day7WorkHours += parseInt(this.selectHour137);
      }
    if(this.selectHour141!=0)
      {
        this.weekHours += parseInt(this.selectHour141);
        this.day1WorkHours += parseInt(this.selectHour141);
      }
      if(this.selectHour142!=0)
      {
        this.weekHours += parseInt(this.selectHour142);
        this.day2WorkHours += parseInt(this.selectHour142);
      }
      if(this.selectHour143!=0)
      {
        this.weekHours += parseInt(this.selectHour143);
        this.day3WorkHours += parseInt(this.selectHour143);
      }
      if(this.selectHour144!=0)
      {
        this.weekHours += parseInt(this.selectHour144);
        this.day4WorkHours += parseInt(this.selectHour144);
      }
      if(this.selectHour145!=0)
      {
        this.weekHours += parseInt(this.selectHour145);
        this.day5WorkHours += parseInt(this.selectHour145);
      }
      if(this.selectHour146!=0)
      {
        this.weekHours += parseInt(this.selectHour146);
        this.day6WorkHours += parseInt(this.selectHour146);
      }
      if(this.selectHour147!=0)
      {
        this.weekHours += parseInt(this.selectHour147);
        this.day7WorkHours += parseInt(this.selectHour147);
      }if(this.selectHour151!=0)
      {
        this.weekHours += parseInt(this.selectHour151);
        this.day1WorkHours += parseInt(this.selectHour151);       
      }
      if(this.selectHour152!=0)
      {
        this.weekHours += parseInt(this.selectHour152);
        this.day2WorkHours += parseInt(this.selectHour152);
      }
      if(this.selectHour153!=0)
      {
        this.weekHours += parseInt(this.selectHour153);
        this.day3WorkHours += parseInt(this.selectHour153);
      }
      if(this.selectHour154!=0)
      {
        this.weekHours += parseInt(this.selectHour154);
        this.day4WorkHours += parseInt(this.selectHour154);
      }
      if(this.selectHour155!=0)
      {
        this.weekHours += parseInt(this.selectHour155);
        this.day5WorkHours += parseInt(this.selectHour155);
      }
      if(this.selectHour156!=0)
      {
        this.weekHours += parseInt(this.selectHour156);
        this.day6WorkHours += parseInt(this.selectHour156);
      }
      if(this.selectHour157!=0)
      {
        this.weekHours += parseInt(this.selectHour157);
        this.day7WorkHours += parseInt(this.selectHour157);
      }
    if(this.selectHour161!=0)
      {
        this.weekHours += parseInt(this.selectHour161);
        this.day1WorkHours += parseInt(this.selectHour161);
      }
      if(this.selectHour162!=0)
      {
        this.weekHours += parseInt(this.selectHour162);
        this.day2WorkHours += parseInt(this.selectHour162);
      }
      if(this.selectHour163!=0)
      {
        this.weekHours += parseInt(this.selectHour163);
        this.day3WorkHours += parseInt(this.selectHour163);
      }
      if(this.selectHour164!=0)
      {
        this.weekHours += parseInt(this.selectHour164);
        this.day4WorkHours += parseInt(this.selectHour164);
      }
      if(this.selectHour165!=0)
      {
        this.weekHours += parseInt(this.selectHour165);
        this.day5WorkHours += parseInt(this.selectHour165);
      }
      if(this.selectHour166!=0)
      {
        this.weekHours += parseInt(this.selectHour166);
        this.day6WorkHours += parseInt(this.selectHour166);
      }
      if(this.selectHour167!=0)
      {
        this.weekHours += parseInt(this.selectHour167);
        this.day7WorkHours += parseInt(this.selectHour167);
      }
      if(this.selectHour171!=0)
      {
        this.weekHours += parseInt(this.selectHour171);
        this.day1WorkHours += parseInt(this.selectHour171);
      }
      if(this.selectHour172!=0)
      {
        this.weekHours += parseInt(this.selectHour172);
        this.day2WorkHours += parseInt(this.selectHour172);
      }
      if(this.selectHour173!=0)
      {
        this.weekHours += parseInt(this.selectHour173);
        this.day3WorkHours += parseInt(this.selectHour173);
      }
      if(this.selectHour174!=0)
      {
        this.weekHours += parseInt(this.selectHour174);
        this.day4WorkHours += parseInt(this.selectHour174);
      }
      if(this.selectHour175!=0)
      {
        this.weekHours += parseInt(this.selectHour175);
        this.day5WorkHours += parseInt(this.selectHour175);
      }
      if(this.selectHour176!=0)
      {
        this.weekHours += parseInt(this.selectHour176);
        this.day6WorkHours += parseInt(this.selectHour176);
      }
      if(this.selectHour177!=0)
      {
        this.weekHours += parseInt(this.selectHour177);
        this.day7WorkHours += parseInt(this.selectHour177);
      }
    if(this.selectHour181!=0)
      {
        this.weekHours += parseInt(this.selectHour181);
        this.day1WorkHours += parseInt(this.selectHour181);
      }
      if(this.selectHour182!=0)
      {
        this.weekHours += parseInt(this.selectHour182);
        this.day2WorkHours += parseInt(this.selectHour182);
      }
      if(this.selectHour183!=0)
      {
        this.weekHours += parseInt(this.selectHour183);
        this.day3WorkHours += parseInt(this.selectHour183);
      }
      if(this.selectHour184!=0)
      {
        this.weekHours += parseInt(this.selectHour184);
        this.day4WorkHours += parseInt(this.selectHour184);
      }
      if(this.selectHour185!=0)
      {
        this.weekHours += parseInt(this.selectHour185);
        this.day5WorkHours += parseInt(this.selectHour185);
      }
      if(this.selectHour186!=0)
      {
        this.weekHours += parseInt(this.selectHour186);
        this.day6WorkHours += parseInt(this.selectHour186);
      }
      if(this.selectHour187!=0)
      {
        this.weekHours += parseInt(this.selectHour187);
        this.day7WorkHours += parseInt(this.selectHour187);
      }
      if((this.weekHours)<40) 
      {
        this.submitMessage="Number of hours spent are less than 40.";
        this.messageStatus=true;
      }
      else if ((this.day1WorkHours>24))
      {
        this.submitMessage="Number of hours spent on Monday are more than 24.";
        this.messageStatus=true;
      }
      else if ((this.day2WorkHours>24))
      {
        this.submitMessage="Number of hours spent on Tuesday are more than 24.";
        this.messageStatus=true;
      }
      else if ((this.day3WorkHours>24))
      {
        this.submitMessage="Number of hours spent on Wednesday are more than 24.";
        this.messageStatus=true;
      }
      else if ((this.day4WorkHours>24))
      {
        this.submitMessage="Number of hours spent on Thursday are more than 24.";
        this.messageStatus=true;
      }
      else if ((this.day5WorkHours>24))
      {
        this.submitMessage="Number of hours spent on Friday are more than 24.";
        this.messageStatus=true;
      }
      else if ((this.day6WorkHours>24))
      {
        this.submitMessage="Number of hours spent on Saturday are more than 24.";
        this.messageStatus=true;
      }
      else if ((this.day7WorkHours>24))
      {
        this.submitMessage="Number of hours spent on Sunday are more than 24.";
        this.messageStatus=true;
      }
      else
      {

          this.dateq = this.year + "-" + this.month + "-" + this.day;
          this.monthx = parseInt(this.dateq.split("-")[1]);
          //this.monthx = this.dateSupplied.getMonth()+1;
          this.datex = parseInt(this.dateq.split("-")[2]);
          console.log(this.dateq, this.monthx, this.datex);

          if(this.monthx<10) {
            this.monthy = "0"+this.monthx;
          }
          else 
          {
            this.monthy =this.monthx.toString();
          }
          if(this.datex<10) {
            this.datey = "0"+this.datex;
          }
          else{
            this.datey = this.datex.toString();
          }
          var datet: string = this.year+'-'+this.monthy+'-'+this.datey;
          this.daten = new Date(Date.parse(datet));
          console.log("date is "+datet);

    var timesheetWeekly : weeklyTimesheetParameter = {timesheet1Date: this.date1,timesheet2Date: this.date2 , timesheet3Date: this.date3,timesheet4Date: this.date4,timesheet5Date: new Date(Date.parse(datet)), timesheet6Date: this.date6, timesheet7Date: this.date7};
      console.log("Week"+      timesheetWeekly.timesheet1Date, timesheetWeekly.timesheet2Date, timesheetWeekly.timesheet3Date, timesheetWeekly.timesheet4Date
      ,timesheetWeekly.timesheet5Date, timesheetWeekly.timesheet6Date, timesheetWeekly.timesheet7Date);
    this.http.post('http://apimicro.trasers.com/TestAPI/api/submitTimesheetWeekly/AddTimesheetWeekly', timesheetWeekly).subscribe( (data) => { console.log(data); });
        
    
    if(this.selectedValue1 != "")
    {
      
    var timesheet1 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue1,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    console.log("Timesheet date"+timesheet1.timesheet1Date);
   this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data);});
    }
    if(this.selectedValue2 != "")
    {
      var timesheet2 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue2,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue3 != "")
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue3,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Submitted' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue4 != "")
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue4,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet4).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue5 != "")
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue5,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Submitted' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet5).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != "")
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue6,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet6).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue7 != "")
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue7,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour71, timesheet2DateEffort: this.selectHour72,timesheet3DateEffort: this.selectHour73,timesheet4DateEffort: this.selectHour74,timesheet5DateEffort: this.selectHour75,timesheet6DateEffort: this.selectHour76,timesheet7DateEffort: this.selectHour77,  taskDescription: this.workDescription7 ,timesheetStatus:'Submitted' }; 
    console.log("Timesheet date"+timesheet1.timesheet1Date);
   this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data);});
    }
    if(this.selectedValue8 != "")
    {
      var timesheet2 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue8,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour81, timesheet2DateEffort: this.selectHour82,timesheet3DateEffort: this.selectHour83,timesheet4DateEffort: this.selectHour84,timesheet5DateEffort: this.selectHour85,timesheet6DateEffort: this.selectHour86,timesheet7DateEffort: this.selectHour87, taskDescription: this.workDescription8,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue9 != "")
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue9,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour91, timesheet2DateEffort: this.selectHour92,timesheet3DateEffort: this.selectHour93,timesheet4DateEffort: this.selectHour94,timesheet5DateEffort: this.selectHour95,timesheet6DateEffort: this.selectHour96,timesheet7DateEffort: this.selectHour97,  taskDescription: this.workDescription9,timesheetStatus:'Submitted' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue10 != "")
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue10,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour101, timesheet2DateEffort: this.selectHour102,timesheet3DateEffort: this.selectHour103,timesheet4DateEffort: this.selectHour104,timesheet5DateEffort: this.selectHour105,timesheet6DateEffort: this.selectHour106,timesheet7DateEffort: this.selectHour107, taskDescription: this.workDescription10,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet4).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue11 != "")
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue11,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour111, timesheet2DateEffort: this.selectHour112,timesheet3DateEffort: this.selectHour113,timesheet4DateEffort: this.selectHour114,timesheet5DateEffort: this.selectHour115,timesheet6DateEffort: this.selectHour116,timesheet7DateEffort: this.selectHour117,  taskDescription: this.workDescription11,timesheetStatus:'Submitted' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet5).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue12 != "")
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue12,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour121, timesheet2DateEffort: this.selectHour122,timesheet3DateEffort: this.selectHour123,timesheet4DateEffort: this.selectHour124,timesheet5DateEffort: this.selectHour125,timesheet6DateEffort: this.selectHour126,timesheet7DateEffort: this.selectHour127, taskDescription: this.workDescription12,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet6).subscribe( (data) => { console.log(data); });
    }if(this.selectedValue13 != "")
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue13,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour131, timesheet2DateEffort: this.selectHour132,timesheet3DateEffort: this.selectHour133,timesheet4DateEffort: this.selectHour134,timesheet5DateEffort: this.selectHour135,timesheet6DateEffort: this.selectHour136,timesheet7DateEffort: this.selectHour137,  taskDescription: this.workDescription13 ,timesheetStatus:'Submitted' }; 
    console.log("Timesheet date"+timesheet1.timesheet1Date);
   this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data);});
    }
    if(this.selectedValue14 != "")
    {
      var timesheet2 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue14,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour141, timesheet2DateEffort: this.selectHour142,timesheet3DateEffort: this.selectHour143,timesheet4DateEffort: this.selectHour144,timesheet5DateEffort: this.selectHour145,timesheet6DateEffort: this.selectHour146,timesheet7DateEffort: this.selectHour147, taskDescription: this.workDescription14,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue15 != "")
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue15,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour151, timesheet2DateEffort: this.selectHour152,timesheet3DateEffort: this.selectHour153,timesheet4DateEffort: this.selectHour154,timesheet5DateEffort: this.selectHour155,timesheet6DateEffort: this.selectHour156,timesheet7DateEffort: this.selectHour157,  taskDescription: this.workDescription15,timesheetStatus:'Submitted' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue16 != "")
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue16,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour161, timesheet2DateEffort: this.selectHour162,timesheet3DateEffort: this.selectHour163,timesheet4DateEffort: this.selectHour164,timesheet5DateEffort: this.selectHour165,timesheet6DateEffort: this.selectHour166,timesheet7DateEffort: this.selectHour167, taskDescription: this.workDescription16,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet4).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue17 != "")
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue17,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour171, timesheet2DateEffort: this.selectHour172,timesheet3DateEffort: this.selectHour173,timesheet4DateEffort: this.selectHour174,timesheet5DateEffort: this.selectHour175,timesheet6DateEffort: this.selectHour176,timesheet7DateEffort: this.selectHour177,  taskDescription: this.workDescription17,timesheetStatus:'Submitted' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet5).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue18 != "")
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue18,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour181, timesheet2DateEffort: this.selectHour182,timesheet3DateEffort: this.selectHour183,timesheet4DateEffort: this.selectHour184,timesheet5DateEffort: this.selectHour185,timesheet6DateEffort: this.selectHour186,timesheet7DateEffort: this.selectHour187, taskDescription: this.workDescription18,timesheetStatus:'Submitted' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet6).subscribe( (data) => { console.log(data); });
    }

    var timesheet7 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: '',timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: 0, timesheet2DateEffort: 0,timesheet3DateEffort: 0,timesheet4DateEffort: 0,timesheet5DateEffort: 0,timesheet6DateEffort: 0,timesheet7DateEffort: 0, taskDescription: "",timesheetStatus:'' }; 
      console.log(timesheet7.empId,timesheet7.timesheet1Date);
    

      setTimeout(()=> {
      this.http.post('http://apimicro.trasers.com/TestAPI/api/EmailTrigger/EditTimesheet', timesheet7).subscribe( (data) => { console.log(data); });  
      }, 4500);

      setTimeout(()=> {
        this.navigate.home();
      }, 900);
    }
    }   

    employeeDetails;
    displayEmployeesDetails(data) {
      this.employeeDetails = data;
    }

    clearTimesheet(){
      this.selectHour11=0;this.selectHour12=0;this.selectHour13=0;this.selectHour14=0;this.selectHour15=0;this.selectHour16=0;this.selectHour17=0;
      this.selectHour21=0;this.selectHour22=0;this.selectHour23=0;this.selectHour24=0;this.selectHour25=0;this.selectHour26=0;this.selectHour27=0;
      this.selectHour31=0;this.selectHour32=0;this.selectHour33=0;this.selectHour34=0;this.selectHour35=0;this.selectHour36=0;this.selectHour37=0;
      this.selectHour41=0;this.selectHour42=0;this.selectHour43=0;this.selectHour44=0;this.selectHour45=0;this.selectHour46=0;this.selectHour47=0;
      this.selectHour51=0;this.selectHour52=0;this.selectHour53=0;this.selectHour54=0;this.selectHour55=0;this.selectHour56=0;this.selectHour57=0;
      this.selectHour61=0;this.selectHour62=0;this.selectHour63=0;this.selectHour64=0;this.selectHour65=0;this.selectHour66=0;this.selectHour67=0;
      this.selectHour71=0;this.selectHour72=0;this.selectHour73=0;this.selectHour74=0;this.selectHour75=0;this.selectHour76=0;this.selectHour77=0;
      this.selectHour81=0;this.selectHour82=0;this.selectHour83=0;this.selectHour84=0;this.selectHour85=0;this.selectHour86=0;this.selectHour87=0;
      this.selectHour91=0;this.selectHour92=0;this.selectHour93=0;this.selectHour94=0;this.selectHour95=0;this.selectHour96=0;this.selectHour97=0;
      this.selectHour101=0;this.selectHour102=0;this.selectHour103=0;this.selectHour104=0;this.selectHour105=0;this.selectHour106=0;this.selectHour107=0;
      this.selectHour111=0;this.selectHour112=0;this.selectHour113=0;this.selectHour114=0;this.selectHour115=0;this.selectHour116=0;this.selectHour117=0;
      this.selectHour121=0;this.selectHour122=0;this.selectHour123=0;this.selectHour124=0;this.selectHour125=0;this.selectHour126=0;this.selectHour127=0;
      this.selectHour131=0;this.selectHour132=0;this.selectHour133=0;this.selectHour134=0;this.selectHour135=0;this.selectHour136=0;this.selectHour137=0;
      this.selectHour141=0;this.selectHour142=0;this.selectHour143=0;this.selectHour144=0;this.selectHour145=0;this.selectHour146=0;this.selectHour147=0;
      this.selectHour151=0;this.selectHour152=0;this.selectHour153=0;this.selectHour154=0;this.selectHour155=0;this.selectHour156=0;this.selectHour157=0;
      this.selectHour161=0;this.selectHour162=0;this.selectHour163=0;this.selectHour164=0;this.selectHour165=0;this.selectHour166=0;this.selectHour167=0;
      this.selectHour171=0;this.selectHour172=0;this.selectHour173=0;this.selectHour174=0;this.selectHour175=0;this.selectHour176=0;this.selectHour177=0;
      this.selectHour181=0;this.selectHour182=0;this.selectHour183=0;this.selectHour184=0;this.selectHour185=0;this.selectHour186=0;this.selectHour187=0;
      
      this.selectedValue1="";this.selectedValue2="";this.selectedValue3="";this.selectedValue4="";this.selectedValue5="";this.selectedValue6="";
      this.selectedValue7="";this.selectedValue8="";this.selectedValue9="";this.selectedValue10="";this.selectedValue11="";this.selectedValue12="";
      this.selectedValue13="";this.selectedValue14="";this.selectedValue15="";this.selectedValue16="";this.selectedValue17="";this.selectedValue18="";
      this.weekHours=0; this.messageStatus=false; this.submitMessage=""; this.day1WorkHours=0;  this.day2WorkHours=0; 
      this.day3WorkHours=0;     this.day4WorkHours=0; this.day5WorkHours=0; this.day6WorkHours=0;  this.day7WorkHours=0;

      this.workDescription1="";this.workDescription2="";this.workDescription3="";this.workDescription4="";
      this.workDescription5="";this.workDescription6="";
      this.workDescription7="";this.workDescription8="";this.workDescription9="";this.workDescription10="";
      this.workDescription11="";this.workDescription12="";
      this.workDescription13="";this.workDescription14="";this.workDescription15="";this.workDescription16="";
      this.workDescription17="";this.workDescription18="";
  
    }

    cancelTimesheet(){
      this.navigate.home();
    }

    
    addRow(){
      if(!this.one)
    {
      this.one=true;
    }
    else if((!this.two) && this.one &&  this.selectedValue1!=""){
      this.two = true;
    }
    else if((!this.three) && this.two && this.selectedValue2!=""){
      this.three = true;
    }
    else if((!this.four) && this.three && this.selectedValue3!=""){
      this.four = true;
    }
    else if((!this.five) && this.four && this.selectedValue4!="")
    {
      this.five=true;
    }
      else if(!this.six && this.five && this.selectedValue5!="")
      {
        this.six=true;
      }
      else if(!this.seven && this.six && this.selectedValue6!="")
      {
        this.seven=true;
      }
      else if(!this.eight && this.seven && this.selectedValue7!="")
      {
        this.eight=true;
      }
      else if(!this.nine && this.eight && this.selectedValue8!="")
      {
        this.nine=true;
      }
      else if(!this.ten && this.nine && this.selectedValue9!="")
      {
        this.ten=true;
      }
      else if(!this.eleven && this.ten && this.selectedValue10!="")
      {
        this.eleven=true;
      }
      else if(!this.twelve && this.eleven && this.selectedValue11!="")
      {
        this.twelve=true;
      }
      else if(!this.thirteen && this.twelve && this.selectedValue12!="")
      {
        this.twelve=true;
      }
      else if(!this.fourteen && this.thirteen && this.selectedValue13!="")
      {
        this.fourteen=true;
      }
      else if(!this.fifteen && this.fourteen && this.selectedValue14!="")
      {
        this.fifteen=true;
      }
      else if(!this.sixteen && this.fifteen && this.selectedValue15!="")
      {
        this.sixteen=true;
      }
      else if(!this.seventeen && this.sixteen && this.selectedValue16!="")
      {
        this.seventeen=true;
      }
      else
      {
        this.eighteen=true;
      }

    }

    save()
  {
    if(this.selectHour11!=0)
    {
      this.weekHours += parseInt(this.selectHour11);
      this.day1WorkHours += parseInt(this.selectHour11);
    }
    if(this.selectHour12!=0)
    {
      this.weekHours += parseInt(this.selectHour12);
      this.day2WorkHours += parseInt(this.selectHour12);
    }
    if(this.selectHour13!=0)
    {
      this.weekHours += parseInt(this.selectHour13);
      this.day3WorkHours += parseInt(this.selectHour13);
    }
    if(this.selectHour14!=0)
    {
      this.weekHours += parseInt(this.selectHour14);
      this.day4WorkHours += parseInt(this.selectHour14);
    }
    if(this.selectHour15!=0)
    {
      this.weekHours += parseInt(this.selectHour15);
      this.day5WorkHours += parseInt(this.selectHour15);
    }
    if(this.selectHour16!=0)
    {
      this.weekHours += parseInt(this.selectHour16);
      this.day6WorkHours += parseInt(this.selectHour16);
    }
    if(this.selectHour17!=0)
    {
      this.weekHours += parseInt(this.selectHour17);
      this.day7WorkHours += parseInt(this.selectHour17);
    }
  if(this.selectHour21!=0)
    {
      this.weekHours += parseInt(this.selectHour21);
      this.day1WorkHours += parseInt(this.selectHour21);
    }
    if(this.selectHour22!=0)
    {
      this.weekHours += parseInt(this.selectHour22);
      this.day2WorkHours += parseInt(this.selectHour22);
    }
    if(this.selectHour23!=0)
    {
      this.weekHours += parseInt(this.selectHour23);
      this.day3WorkHours += parseInt(this.selectHour23);
    }
    if(this.selectHour24!=0)
    {
      this.weekHours += parseInt(this.selectHour24);
      this.day4WorkHours += parseInt(this.selectHour24);
    }
    if(this.selectHour25!=0)
    {
      this.weekHours += parseInt(this.selectHour25);
      this.day5WorkHours += parseInt(this.selectHour25);
    }
    if(this.selectHour26!=0)
    {
      this.weekHours += parseInt(this.selectHour26);
      this.day6WorkHours += parseInt(this.selectHour26);
    }
    if(this.selectHour27!=0)
    {
      this.weekHours += parseInt(this.selectHour27);
      this.day7WorkHours += parseInt(this.selectHour27);
    }if(this.selectHour31!=0)
    {
      this.weekHours += parseInt(this.selectHour31);
      this.day1WorkHours += parseInt(this.selectHour31);       
    }
    if(this.selectHour32!=0)
    {
      this.weekHours += parseInt(this.selectHour32);
      this.day2WorkHours += parseInt(this.selectHour32);
    }
    if(this.selectHour33!=0)
    {
      this.weekHours += parseInt(this.selectHour33);
      this.day3WorkHours += parseInt(this.selectHour33);
    }
    if(this.selectHour34!=0)
    {
      this.weekHours += parseInt(this.selectHour34);
      this.day4WorkHours += parseInt(this.selectHour34);
    }
    if(this.selectHour35!=0)
    {
      this.weekHours += parseInt(this.selectHour35);
      this.day5WorkHours += parseInt(this.selectHour35);
    }
    if(this.selectHour36!=0)
    {
      this.weekHours += parseInt(this.selectHour36);
      this.day6WorkHours += parseInt(this.selectHour36);
    }
    if(this.selectHour37!=0)
    {
      this.weekHours += parseInt(this.selectHour37);
      this.day7WorkHours += parseInt(this.selectHour37);
    }
  if(this.selectHour41!=0)
    {
      this.weekHours += parseInt(this.selectHour41);
      this.day1WorkHours += parseInt(this.selectHour41);
    }
    if(this.selectHour42!=0)
    {
      this.weekHours += parseInt(this.selectHour42);
      this.day2WorkHours += parseInt(this.selectHour42);
    }
    if(this.selectHour43!=0)
    {
      this.weekHours += parseInt(this.selectHour43);
      this.day3WorkHours += parseInt(this.selectHour43);
    }
    if(this.selectHour44!=0)
    {
      this.weekHours += parseInt(this.selectHour44);
      this.day4WorkHours += parseInt(this.selectHour44);
    }
    if(this.selectHour45!=0)
    {
      this.weekHours += parseInt(this.selectHour45);
      this.day5WorkHours += parseInt(this.selectHour45);
    }
    if(this.selectHour46!=0)
    {
      this.weekHours += parseInt(this.selectHour46);
      this.day6WorkHours += parseInt(this.selectHour46);
    }
    if(this.selectHour47!=0)
    {
      this.weekHours += parseInt(this.selectHour47);
      this.day7WorkHours += parseInt(this.selectHour47);
    }
    if(this.selectHour51!=0)
    {
      this.weekHours += parseInt(this.selectHour51);
      this.day1WorkHours += parseInt(this.selectHour51);
    }
    if(this.selectHour52!=0)
    {
      this.weekHours += parseInt(this.selectHour52);
      this.day2WorkHours += parseInt(this.selectHour52);
    }
    if(this.selectHour53!=0)
    {
      this.weekHours += parseInt(this.selectHour53);
      this.day3WorkHours += parseInt(this.selectHour53);
    }
    if(this.selectHour54!=0)
    {
      this.weekHours += parseInt(this.selectHour54);
      this.day4WorkHours += parseInt(this.selectHour54);
    }
    if(this.selectHour55!=0)
    {
      this.weekHours += parseInt(this.selectHour55);
      this.day5WorkHours += parseInt(this.selectHour55);
    }
    if(this.selectHour56!=0)
    {
      this.weekHours += parseInt(this.selectHour56);
      this.day6WorkHours += parseInt(this.selectHour56);
    }
    if(this.selectHour57!=0)
    {
      this.weekHours += parseInt(this.selectHour57);
      this.day7WorkHours += parseInt(this.selectHour57);
    }
    if(this.selectHour61!=0)
    {
      this.weekHours += parseInt(this.selectHour61);
      this.day1WorkHours += parseInt(this.selectHour61);
    }
    if(this.selectHour62!=0)
    {
      this.weekHours += parseInt(this.selectHour62);
      this.day2WorkHours += parseInt(this.selectHour62);
    }
    if(this.selectHour63!=0)
    {
      this.weekHours += parseInt(this.selectHour63);
      this.day3WorkHours += parseInt(this.selectHour63);
    }
    if(this.selectHour64!=0)
    {
      this.weekHours += parseInt(this.selectHour64);
      this.day4WorkHours += parseInt(this.selectHour64);
    }
    if(this.selectHour65!=0)
    {
      this.weekHours += parseInt(this.selectHour65);
      this.day5WorkHours += parseInt(this.selectHour65);
    }
    if(this.selectHour66!=0)
    {
      this.weekHours += parseInt(this.selectHour66);
      this.day6WorkHours += parseInt(this.selectHour66);
    }
    if(this.selectHour67!=0)
    {
      this.weekHours += parseInt(this.selectHour67);
      this.day7WorkHours += parseInt(this.selectHour67);
    }
    if(this.selectHour71!=0)
      {
        this.weekHours += parseInt(this.selectHour71);
        this.day1WorkHours += parseInt(this.selectHour71);
      }
      if(this.selectHour72!=0)
      {
        this.weekHours += parseInt(this.selectHour72);
        this.day2WorkHours += parseInt(this.selectHour72);
      }
      if(this.selectHour73!=0)
      {
        this.weekHours += parseInt(this.selectHour73);
        this.day3WorkHours += parseInt(this.selectHour73);
      }
      if(this.selectHour74!=0)
      {
        this.weekHours += parseInt(this.selectHour74);
        this.day4WorkHours += parseInt(this.selectHour74);
      }
      if(this.selectHour75!=0)
      {
        this.weekHours += parseInt(this.selectHour75);
        this.day5WorkHours += parseInt(this.selectHour75);
      }
      if(this.selectHour76!=0)
      {
        this.weekHours += parseInt(this.selectHour76);
        this.day6WorkHours += parseInt(this.selectHour76);
      }
      if(this.selectHour77!=0)
      {
        this.weekHours += parseInt(this.selectHour77);
        this.day7WorkHours += parseInt(this.selectHour77);
      }
    if(this.selectHour81!=0)
      {
        this.weekHours += parseInt(this.selectHour81);
        this.day1WorkHours += parseInt(this.selectHour81);
      }
      if(this.selectHour82!=0)
      {
        this.weekHours += parseInt(this.selectHour82);
        this.day2WorkHours += parseInt(this.selectHour82);
      }
      if(this.selectHour83!=0)
      {
        this.weekHours += parseInt(this.selectHour83);
        this.day3WorkHours += parseInt(this.selectHour83);
      }
      if(this.selectHour84!=0)
      {
        this.weekHours += parseInt(this.selectHour84);
        this.day4WorkHours += parseInt(this.selectHour84);
      }
      if(this.selectHour85!=0)
      {
        this.weekHours += parseInt(this.selectHour85);
        this.day5WorkHours += parseInt(this.selectHour85);
      }
      if(this.selectHour86!=0)
      {
        this.weekHours += parseInt(this.selectHour86);
        this.day6WorkHours += parseInt(this.selectHour86);
      }
      if(this.selectHour87!=0)
      {
        this.weekHours += parseInt(this.selectHour87);
        this.day7WorkHours += parseInt(this.selectHour87);
      }if(this.selectHour91!=0)
      {
        this.weekHours += parseInt(this.selectHour91);
        this.day1WorkHours += parseInt(this.selectHour91);       
      }
      if(this.selectHour92!=0)
      {
        this.weekHours += parseInt(this.selectHour92);
        this.day2WorkHours += parseInt(this.selectHour92);
      }
      if(this.selectHour93!=0)
      {
        this.weekHours += parseInt(this.selectHour93);
        this.day3WorkHours += parseInt(this.selectHour93);
      }
      if(this.selectHour94!=0)
      {
        this.weekHours += parseInt(this.selectHour94);
        this.day4WorkHours += parseInt(this.selectHour94);
      }
      if(this.selectHour95!=0)
      {
        this.weekHours += parseInt(this.selectHour95);
        this.day5WorkHours += parseInt(this.selectHour95);
      }
      if(this.selectHour96!=0)
      {
        this.weekHours += parseInt(this.selectHour96);
        this.day6WorkHours += parseInt(this.selectHour96);
      }
      if(this.selectHour97!=0)
      {
        this.weekHours += parseInt(this.selectHour97);
        this.day7WorkHours += parseInt(this.selectHour97);
      }
    if(this.selectHour101!=0)
      {
        this.weekHours += parseInt(this.selectHour101);
        this.day1WorkHours += parseInt(this.selectHour101);
      }
      if(this.selectHour102!=0)
      {
        this.weekHours += parseInt(this.selectHour102);
        this.day2WorkHours += parseInt(this.selectHour102);
      }
      if(this.selectHour103!=0)
      {
        this.weekHours += parseInt(this.selectHour103);
        this.day3WorkHours += parseInt(this.selectHour103);
      }
      if(this.selectHour104!=0)
      {
        this.weekHours += parseInt(this.selectHour104);
        this.day4WorkHours += parseInt(this.selectHour104);
      }
      if(this.selectHour105!=0)
      {
        this.weekHours += parseInt(this.selectHour105);
        this.day5WorkHours += parseInt(this.selectHour105);
      }
      if(this.selectHour106!=0)
      {
        this.weekHours += parseInt(this.selectHour106);
        this.day6WorkHours += parseInt(this.selectHour106);
      }
      if(this.selectHour107!=0)
      {
        this.weekHours += parseInt(this.selectHour107);
        this.day7WorkHours += parseInt(this.selectHour107);
      }
      if(this.selectHour111!=0)
      {
        this.weekHours += parseInt(this.selectHour111);
        this.day1WorkHours += parseInt(this.selectHour111);
      }
      if(this.selectHour112!=0)
      {
        this.weekHours += parseInt(this.selectHour112);
        this.day2WorkHours += parseInt(this.selectHour112);
      }
      if(this.selectHour113!=0)
      {
        this.weekHours += parseInt(this.selectHour113);
        this.day3WorkHours += parseInt(this.selectHour113);
      }
      if(this.selectHour114!=0)
      {
        this.weekHours += parseInt(this.selectHour114);
        this.day4WorkHours += parseInt(this.selectHour114);
      }
      if(this.selectHour115!=0)
      {
        this.weekHours += parseInt(this.selectHour115);
        this.day5WorkHours += parseInt(this.selectHour115);
      }
      if(this.selectHour116!=0)
      {
        this.weekHours += parseInt(this.selectHour116);
        this.day6WorkHours += parseInt(this.selectHour116);
      }
      if(this.selectHour117!=0)
      {
        this.weekHours += parseInt(this.selectHour117);
        this.day7WorkHours += parseInt(this.selectHour117);
      }
    if(this.selectHour121!=0)
      {
        this.weekHours += parseInt(this.selectHour121);
        this.day1WorkHours += parseInt(this.selectHour121);
      }
      if(this.selectHour122!=0)
      {
        this.weekHours += parseInt(this.selectHour122);
        this.day2WorkHours += parseInt(this.selectHour122);
      }
      if(this.selectHour123!=0)
      {
        this.weekHours += parseInt(this.selectHour123);
        this.day3WorkHours += parseInt(this.selectHour123);
      }
      if(this.selectHour124!=0)
      {
        this.weekHours += parseInt(this.selectHour124);
        this.day4WorkHours += parseInt(this.selectHour124);
      }
      if(this.selectHour125!=0)
      {
        this.weekHours += parseInt(this.selectHour125);
        this.day5WorkHours += parseInt(this.selectHour125);
      }
      if(this.selectHour126!=0)
      {
        this.weekHours += parseInt(this.selectHour126);
        this.day6WorkHours += parseInt(this.selectHour126);
      }
      if(this.selectHour127!=0)
      {
        this.weekHours += parseInt(this.selectHour127);
        this.day7WorkHours += parseInt(this.selectHour127);
      }
      if(this.selectHour131!=0)
      {
        this.weekHours += parseInt(this.selectHour131);
        this.day1WorkHours += parseInt(this.selectHour131);
      }
      if(this.selectHour132!=0)
      {
        this.weekHours += parseInt(this.selectHour132);
        this.day2WorkHours += parseInt(this.selectHour132);
      }
      if(this.selectHour133!=0)
      {
        this.weekHours += parseInt(this.selectHour133);
        this.day3WorkHours += parseInt(this.selectHour133);
      }
      if(this.selectHour134!=0)
      {
        this.weekHours += parseInt(this.selectHour134);
        this.day4WorkHours += parseInt(this.selectHour134);
      }
      if(this.selectHour135!=0)
      {
        this.weekHours += parseInt(this.selectHour135);
        this.day5WorkHours += parseInt(this.selectHour135);
      }
      if(this.selectHour136!=0)
      {
        this.weekHours += parseInt(this.selectHour136);
        this.day6WorkHours += parseInt(this.selectHour136);
      }
      if(this.selectHour137!=0)
      {
        this.weekHours += parseInt(this.selectHour137);
        this.day7WorkHours += parseInt(this.selectHour137);
      }
    if(this.selectHour141!=0)
      {
        this.weekHours += parseInt(this.selectHour141);
        this.day1WorkHours += parseInt(this.selectHour141);
      }
      if(this.selectHour142!=0)
      {
        this.weekHours += parseInt(this.selectHour142);
        this.day2WorkHours += parseInt(this.selectHour142);
      }
      if(this.selectHour143!=0)
      {
        this.weekHours += parseInt(this.selectHour143);
        this.day3WorkHours += parseInt(this.selectHour143);
      }
      if(this.selectHour144!=0)
      {
        this.weekHours += parseInt(this.selectHour144);
        this.day4WorkHours += parseInt(this.selectHour144);
      }
      if(this.selectHour145!=0)
      {
        this.weekHours += parseInt(this.selectHour145);
        this.day5WorkHours += parseInt(this.selectHour145);
      }
      if(this.selectHour146!=0)
      {
        this.weekHours += parseInt(this.selectHour146);
        this.day6WorkHours += parseInt(this.selectHour146);
      }
      if(this.selectHour147!=0)
      {
        this.weekHours += parseInt(this.selectHour147);
        this.day7WorkHours += parseInt(this.selectHour147);
      }if(this.selectHour151!=0)
      {
        this.weekHours += parseInt(this.selectHour151);
        this.day1WorkHours += parseInt(this.selectHour151);       
      }
      if(this.selectHour152!=0)
      {
        this.weekHours += parseInt(this.selectHour152);
        this.day2WorkHours += parseInt(this.selectHour152);
      }
      if(this.selectHour153!=0)
      {
        this.weekHours += parseInt(this.selectHour153);
        this.day3WorkHours += parseInt(this.selectHour153);
      }
      if(this.selectHour154!=0)
      {
        this.weekHours += parseInt(this.selectHour154);
        this.day4WorkHours += parseInt(this.selectHour154);
      }
      if(this.selectHour155!=0)
      {
        this.weekHours += parseInt(this.selectHour155);
        this.day5WorkHours += parseInt(this.selectHour155);
      }
      if(this.selectHour156!=0)
      {
        this.weekHours += parseInt(this.selectHour156);
        this.day6WorkHours += parseInt(this.selectHour156);
      }
      if(this.selectHour157!=0)
      {
        this.weekHours += parseInt(this.selectHour157);
        this.day7WorkHours += parseInt(this.selectHour157);
      }
    if(this.selectHour161!=0)
      {
        this.weekHours += parseInt(this.selectHour161);
        this.day1WorkHours += parseInt(this.selectHour161);
      }
      if(this.selectHour162!=0)
      {
        this.weekHours += parseInt(this.selectHour162);
        this.day2WorkHours += parseInt(this.selectHour162);
      }
      if(this.selectHour163!=0)
      {
        this.weekHours += parseInt(this.selectHour163);
        this.day3WorkHours += parseInt(this.selectHour163);
      }
      if(this.selectHour164!=0)
      {
        this.weekHours += parseInt(this.selectHour164);
        this.day4WorkHours += parseInt(this.selectHour164);
      }
      if(this.selectHour165!=0)
      {
        this.weekHours += parseInt(this.selectHour165);
        this.day5WorkHours += parseInt(this.selectHour165);
      }
      if(this.selectHour166!=0)
      {
        this.weekHours += parseInt(this.selectHour166);
        this.day6WorkHours += parseInt(this.selectHour166);
      }
      if(this.selectHour167!=0)
      {
        this.weekHours += parseInt(this.selectHour167);
        this.day7WorkHours += parseInt(this.selectHour167);
      }
      if(this.selectHour171!=0)
      {
        this.weekHours += parseInt(this.selectHour171);
        this.day1WorkHours += parseInt(this.selectHour171);
      }
      if(this.selectHour172!=0)
      {
        this.weekHours += parseInt(this.selectHour172);
        this.day2WorkHours += parseInt(this.selectHour172);
      }
      if(this.selectHour173!=0)
      {
        this.weekHours += parseInt(this.selectHour173);
        this.day3WorkHours += parseInt(this.selectHour173);
      }
      if(this.selectHour174!=0)
      {
        this.weekHours += parseInt(this.selectHour174);
        this.day4WorkHours += parseInt(this.selectHour174);
      }
      if(this.selectHour175!=0)
      {
        this.weekHours += parseInt(this.selectHour175);
        this.day5WorkHours += parseInt(this.selectHour175);
      }
      if(this.selectHour176!=0)
      {
        this.weekHours += parseInt(this.selectHour176);
        this.day6WorkHours += parseInt(this.selectHour176);
      }
      if(this.selectHour177!=0)
      {
        this.weekHours += parseInt(this.selectHour177);
        this.day7WorkHours += parseInt(this.selectHour177);
      }
    if(this.selectHour181!=0)
      {
        this.weekHours += parseInt(this.selectHour181);
        this.day1WorkHours += parseInt(this.selectHour181);
      }
      if(this.selectHour182!=0)
      {
        this.weekHours += parseInt(this.selectHour182);
        this.day2WorkHours += parseInt(this.selectHour182);
      }
      if(this.selectHour183!=0)
      {
        this.weekHours += parseInt(this.selectHour183);
        this.day3WorkHours += parseInt(this.selectHour183);
      }
      if(this.selectHour184!=0)
      {
        this.weekHours += parseInt(this.selectHour184);
        this.day4WorkHours += parseInt(this.selectHour184);
      }
      if(this.selectHour185!=0)
      {
        this.weekHours += parseInt(this.selectHour185);
        this.day5WorkHours += parseInt(this.selectHour185);
      }
      if(this.selectHour186!=0)
      {
        this.weekHours += parseInt(this.selectHour186);
        this.day6WorkHours += parseInt(this.selectHour186);
      }
      if(this.selectHour187!=0)
      {
        this.weekHours += parseInt(this.selectHour187);
        this.day7WorkHours += parseInt(this.selectHour187);
      }
   if ((this.day1WorkHours>24))
    {
      this.submitMessage="Number of hours spent on Monday are more than 24.";
      this.messageStatus=true;
    }
    else if ((this.day2WorkHours>24))
    {
      this.submitMessage="Number of hours spent on Tuesday are more than 24.";
      this.messageStatus=true;
    }
    else if ((this.day3WorkHours>24))
    {
      this.submitMessage="Number of hours spent on Wednesday are more than 24.";
      this.messageStatus=true;
    }
    else if ((this.day4WorkHours>24))
    {
      this.submitMessage="Number of hours spent on Thursday are more than 24.";
      this.messageStatus=true;
    }
    else if ((this.day5WorkHours>24))
    {
      this.submitMessage="Number of hours spent on Friday are more than 24.";
      this.messageStatus=true;
    }
    else if ((this.day6WorkHours>24))
    {
      this.submitMessage="Number of hours spent on Saturday are more than 24.";
      this.messageStatus=true;
    }
    else if ((this.day7WorkHours>24))
    {
      this.submitMessage="Number of hours spent on Sunday are more than 24.";
      this.messageStatus=true;
    }
    else
    {


      this.monthx = parseInt(this.dateq.split("-")[1]);
          this.datex = parseInt(this.dateq.split("-")[2]);
          console.log(this.dateq, this.monthx, this.datex);

          if(this.monthx<10) {
            this.monthy = "0"+this.monthx;
          }
          else 
          {
            this.monthy =this.monthx.toString();
          }
          if(this.datex<10) {
            this.datey = "0"+this.datex;
          }
          else{
            this.datey = this.datex.toString();
          }
          var datet: string = this.year+'-'+this.monthy+'-'+this.datey;
          this.daten = new Date(Date.parse(datet));
          console.log("date is "+datet);
      var timesheetWeekly : weeklyTimesheetParameter = {timesheet1Date: this.date1,timesheet2Date: this.date2 , timesheet3Date: this.date3,timesheet4Date: this.date4,timesheet5Date: new Date(Date.parse(datet)), timesheet6Date: this.date6, timesheet7Date: this.date7};
      this.http.post('http://apimicro.trasers.com/TestAPI/api/submitTimesheetWeekly/AddTimesheetWeekly', timesheetWeekly).subscribe( (data) => { console.log(data); });
    
      if(this.selectedValue1 != "")
      {
      var timesheet1 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue1,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Saved' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue2 != "")
      {
        var timesheet2 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue2,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Saved' }; 
        this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue3 != "")
      {
      var timesheet3 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue3,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Saved'}; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue4 != "")
      {
        var timesheet4 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue4,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Saved' }; 
        this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue5 != "")
      {
      var timesheet5 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue5,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Saved' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue6 != "")
      {
        var timesheet6 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue6,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Saved' }; 
        this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue7 != "")
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue7,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour71, timesheet2DateEffort: this.selectHour72,timesheet3DateEffort: this.selectHour73,timesheet4DateEffort: this.selectHour74,timesheet5DateEffort: this.selectHour75,timesheet6DateEffort: this.selectHour76,timesheet7DateEffort: this.selectHour77,  taskDescription: this.workDescription7 ,timesheetStatus:'Saved' }; 
    console.log("Timesheet date"+timesheet1.timesheet1Date);
   this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data);});
    }
    if(this.selectedValue8 != "")
    {
      var timesheet2 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue8,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour81, timesheet2DateEffort: this.selectHour82,timesheet3DateEffort: this.selectHour83,timesheet4DateEffort: this.selectHour84,timesheet5DateEffort: this.selectHour85,timesheet6DateEffort: this.selectHour86,timesheet7DateEffort: this.selectHour87, taskDescription: this.workDescription8,timesheetStatus:'Saved' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue9 != "")
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue9,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour91, timesheet2DateEffort: this.selectHour92,timesheet3DateEffort: this.selectHour93,timesheet4DateEffort: this.selectHour94,timesheet5DateEffort: this.selectHour95,timesheet6DateEffort: this.selectHour96,timesheet7DateEffort: this.selectHour97,  taskDescription: this.workDescription9,timesheetStatus:'Saved' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue10 != "")
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue10,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour101, timesheet2DateEffort: this.selectHour102,timesheet3DateEffort: this.selectHour103,timesheet4DateEffort: this.selectHour104,timesheet5DateEffort: this.selectHour105,timesheet6DateEffort: this.selectHour106,timesheet7DateEffort: this.selectHour107, taskDescription: this.workDescription10,timesheetStatus:'Saved' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet4).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue11 != "")
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue11,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour111, timesheet2DateEffort: this.selectHour112,timesheet3DateEffort: this.selectHour113,timesheet4DateEffort: this.selectHour114,timesheet5DateEffort: this.selectHour115,timesheet6DateEffort: this.selectHour116,timesheet7DateEffort: this.selectHour117,  taskDescription: this.workDescription11,timesheetStatus:'Saved' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet5).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue12 != "")
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue12,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour121, timesheet2DateEffort: this.selectHour122,timesheet3DateEffort: this.selectHour123,timesheet4DateEffort: this.selectHour124,timesheet5DateEffort: this.selectHour125,timesheet6DateEffort: this.selectHour126,timesheet7DateEffort: this.selectHour127, taskDescription: this.workDescription12,timesheetStatus:'Saved' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet6).subscribe( (data) => { console.log(data); });
    }if(this.selectedValue13 != "")
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue13,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour131, timesheet2DateEffort: this.selectHour132,timesheet3DateEffort: this.selectHour133,timesheet4DateEffort: this.selectHour134,timesheet5DateEffort: this.selectHour135,timesheet6DateEffort: this.selectHour136,timesheet7DateEffort: this.selectHour137,  taskDescription: this.workDescription13 ,timesheetStatus:'Saved' }; 
    console.log("Timesheet date"+timesheet1.timesheet1Date);
   this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data);});
    }
    if(this.selectedValue14 != "")
    {
      var timesheet2 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue14,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour141, timesheet2DateEffort: this.selectHour142,timesheet3DateEffort: this.selectHour143,timesheet4DateEffort: this.selectHour144,timesheet5DateEffort: this.selectHour145,timesheet6DateEffort: this.selectHour146,timesheet7DateEffort: this.selectHour147, taskDescription: this.workDescription14,timesheetStatus:'Saved' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue15 != "")
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue15,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour151, timesheet2DateEffort: this.selectHour152,timesheet3DateEffort: this.selectHour153,timesheet4DateEffort: this.selectHour154,timesheet5DateEffort: this.selectHour155,timesheet6DateEffort: this.selectHour156,timesheet7DateEffort: this.selectHour157,  taskDescription: this.workDescription15,timesheetStatus:'Saved' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue16 != "")
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue16,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour161, timesheet2DateEffort: this.selectHour162,timesheet3DateEffort: this.selectHour163,timesheet4DateEffort: this.selectHour164,timesheet5DateEffort: this.selectHour165,timesheet6DateEffort: this.selectHour166,timesheet7DateEffort: this.selectHour167, taskDescription: this.workDescription16,timesheetStatus:'Saved' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet4).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue17 != "")
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue17,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour171, timesheet2DateEffort: this.selectHour172,timesheet3DateEffort: this.selectHour173,timesheet4DateEffort: this.selectHour174,timesheet5DateEffort: this.selectHour175,timesheet6DateEffort: this.selectHour176,timesheet7DateEffort: this.selectHour177,  taskDescription: this.workDescription17,timesheetStatus:'Saved' }; 
    this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet5).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue18 != "")
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: this.selectedValue18,timesheet1Date:new Date(Date.parse(datet)), timesheet1DateEffort: this.selectHour181, timesheet2DateEffort: this.selectHour182,timesheet3DateEffort: this.selectHour183,timesheet4DateEffort: this.selectHour184,timesheet5DateEffort: this.selectHour185,timesheet6DateEffort: this.selectHour186,timesheet7DateEffort: this.selectHour187, taskDescription: this.workDescription18,timesheetStatus:'Saved' }; 
      this.http.post('http://apimicro.trasers.com/TestAPI/api/AddTimesheet/AddProjectTimesheet', timesheet6).subscribe( (data) => { console.log(data); });
    }


   
    setTimeout(()=> {
      this.navigate.home();
    }, 900);

    }
    }   
}
