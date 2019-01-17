import { Component,OnInit } from '@angular/core';
import {AppNavigationService} from './appnavigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private navigate: AppNavigationService){  }
  ngOnInit(){      
    this.navigate.login();   
  }
}
