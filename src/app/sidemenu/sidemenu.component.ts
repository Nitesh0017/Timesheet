import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AppNavigationService} from '../appnavigation.service';
import {SessionTokenService} from '../session-token.service';
import {BackControllerService} from '../back-controller.service';
import * as CryptoJS from 'crypto-js';
import {NgbModal, ModalDismissReasons, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Timesheet} from '../Timesheet.model';
import {Http} from '@angular/http';
import { map} from 'rxjs/operators';
import { parse } from 'url';
import {Employee} from '../employee.model';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  empId:string="";
  empIdNum: number=0;
  encryptedEmpId: string="";
  isMyReport:boolean=false;
  isAddTimesheet:boolean=false;
  isViewTimesheet: boolean=false;
  closeResult: string="";
  dp:any;
  message:boolean=false;
  checkTimesheetMessage:string="";
  IsManager: boolean=false;
  side:any;

  constructor(private navigate:AppNavigationService, private session:SessionTokenService,private modalService: NgbModal,
     private backController:BackControllerService, private http:Http) { }

     open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }


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
    console.log(this.empIdNum);
    this.backController.isRM(this.empIdNum).subscribe((data : any)=>{
       this.displayTeamMember(data); 
    });
    var employee : Employee = {emailId:'', password:'', empId:this.empIdNum, empName: "",IsRM:0};
    this.http.post('http://apimicro.trasers.com/TestAPI/api/RetrieveEmployeeDetails/details', employee).pipe(map( (response) => response.json()))
    .subscribe((data)=>{console.log(data);
      this.displayEmployeeDetails(data); 
   });  
    this.isMyReport = true;
  }

  displayTeamMember(data){
    if(data.length>0) {this.IsManager = true; console.log(this.IsManager);}
  }

  employeeName:string;
  displayEmployeeDetails(data){
    this.employeeName = data[0]['empName'];
  }

  logout(){
    this.session.logout();
    this.navigate.login();
  }

  year;
  month;
  day; date;   day_of_week;
  startDate:number;
  endDate: number;
  firstDay;firstDate: number=0; firstMonth: number=0; firstYear: number=0;
  secondDay;secondDate: number=0; secondMonth: number=0; secondYear: number=0;
  thirdDay;thirdDate: number=0;   thirdMonth: number=0; thirdYear: number=0;
  fourthDay; fourthDate: number=0; fourthMonth: number=0;  fourthYear: number=0;
  fifthDay;fifthDate: number=0;  fifthMonth: number=0;  fifthYear: number=0;
  sixthDay;sixthDate: number=0;  sixthMonth: number=0;  sixthYear: number=0;
  seventhDay;seventhDate: number=0;  seventhMonth: number=0; seventhYear: number=0;
  weekStart; weekEnd;
  date1; date2; date3; date4; date5; date6; date7;
  selectHour11;selectHour12;selectHour13;selectHour14;selectHour15;selectHour16;selectHour17;
  selectHour21;selectHour22;selectHour23;selectHour24;selectHour25;selectHour26;selectHour27;
  selectHour31;selectHour32;selectHour33;selectHour34;selectHour35;selectHour36;selectHour37;
  selectHour41;selectHour42;selectHour43;selectHour44;selectHour45;selectHour46;selectHour47;
  selectHour51;selectHour52;selectHour53;selectHour54;selectHour55;selectHour56;selectHour57;
  selectHour61;selectHour62;selectHour63;selectHour64;selectHour65;selectHour66;selectHour67;
  selectedValue1;selectedValue2;selectedValue3;selectedValue4;selectedValue5;selectedValue6;
  weekHours: number=0; messageStatus:boolean; submitMessage:string; day1WorkHours: number=0;  day2WorkHours: number=0;   day3WorkHours: number=0;  
  day4WorkHours: number=0; day5WorkHours: number=0; day6WorkHours: number=0;  day7WorkHours: number=0;
  dateSupplied: Date;
  currentDate: Date = new Date();
  dateRequired: Date = new Date();

  DateSelected(dateSelected: NgbDate) {
    this.year = dateSelected.year;
    console.log(dateSelected);
    this.month = dateSelected.month;
    this.day = dateSelected.day;
    this.day = parseInt(this.day);
    this.month = parseInt(this.month);
    this.year = parseInt(this.year);
    this.date1 = this.year + "-" + this.month + "-" + this.day;
    console.log(this.date1);
    let date = new Date(this.date1);
    this.dateSupplied = this.date;
    this.day_of_week = date.getDay();
    console.log('method entered');
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
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-24;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
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
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=30;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
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
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+29;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+30;
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
      console.log("Thursday", this.day, this.month, this.year);
      if(((parseInt(this.day)-3>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-3>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-3>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-3;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+28;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+28;
          console.log(this.startDate)//   this.startDate=parseInt(this.day)+29;
        }
        else
        {
          this.startDate=parseInt(this.day)+26;
        }
      }
      if(((parseInt(this.day)+3<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+3<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+3<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+3;
        console.log(this.endDate);
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-27;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
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
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+27;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+28;
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
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+26;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+27;
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
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+25;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+26;
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
      this.firstMonth = parseInt(this.month)-1;
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

    this.date1 = this.firstYear + "-" + this.firstMonth + "-" + this.firstDate;
    this.weekStart = this.date1;
    this.date1 = new Date(this.date1);
    this.firstDay = this.getDayName(this.date1.getDay());

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
    this.date7 = new Date(this.date4);
    this.dateRequired = new Date(this.date7);
    this.seventhDay = this.getDayName(this.date7.getDay());

    console.log("Current Date "+this.currentDate);
    console.log(" 7th date "+this.dateRequired)
    console.log(this.currentDate , this.dateRequired);
    if(this.currentDate < this.dateRequired)
    {
      this.message = true;
      this.checkTimesheetMessage = "You cannot fill timesheet for this week. Please try another week.";
    }
    else 
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.empIdNum, projectId: '',timesheet1Date:this.date6, timesheet1DateEffort: 0, timesheet2DateEffort: 0,timesheet3DateEffort: 0,timesheet4DateEffort: 0,timesheet5DateEffort:0,timesheet6DateEffort:0,timesheet7DateEffort: 0,  taskDescription: '' ,timesheetStatus:''}; 
    console.log(timesheet1.empId,timesheet1.timesheet1Date);
    this.http.post('http://apimicro.trasers.com/TestAPI/api/CheckTimesheetWeek/checkFirstDate', timesheet1).subscribe( (data) => { 
      console.log(data);this.checkTimesheetDateResult(data); });
    }
    }

    checkDateResult;
    checkTimesheetDateResult(data){
      this.checkDateResult = data['_body'];
      if(this.checkDateResult === "No timesheet exist.")
      {

        this.navigate.addTimesheet(this.year, this.month,this.day);
      }
      else
      {
        this.message = true;
        this.checkTimesheetMessage = this.checkDateResult;
      }
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

  removeTimesheetStatus(){
    this.message=false;
    this.checkTimesheetMessage="";
    this.navigate.home();

  }
}


