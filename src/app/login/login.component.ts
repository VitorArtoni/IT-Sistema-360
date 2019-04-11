import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.login().subscribe((res) => {
      console.log('response from post data is ', res);
    }, (err) => {
      console.log('error during post: ', err);
    })
  }
}
