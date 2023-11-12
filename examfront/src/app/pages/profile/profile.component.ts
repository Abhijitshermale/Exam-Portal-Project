import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user = null;

  constructor(private login:LoginService){}

  ngOnInit(): void {
    this.user =this.login.getUser();  
  }

    
}
