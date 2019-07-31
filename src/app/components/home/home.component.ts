import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url;
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.url = this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : '';
      console.log('URL:', this.url);
    })
  }

  logout() {
    this.authService.logout()
      .subscribe(success => {
        if (success)
          this.router.navigate(['/login']);
      });
  }

}
