import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() { }

  loginAluno(event) {
    event.preventDefault();
    const target = event.target;
    const ra = target.querySelector('#ra').value;
    const senha = target.querySelector('#password').value;

    this.loginService.loginAluno(ra, senha).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/home']);
        this.loginService.setLoginState(true);
      }
      else {
        window.alert('Credenciais incorretas');
      }
    });
  }
}
