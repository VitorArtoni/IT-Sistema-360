import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  loginAluno(event) {
    event.preventDefault();
    const target = event.target;
    const ra = target.querySelector('#ra').value;
    const senha = target.querySelector('#password').value;

    this.authService.login(
      {
        username: ra,
        password: senha
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/home']);
        }
      });
  }
}
