import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  d = true;
  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.d);
    this.authService.isSessionID.subscribe(d => {
      this.d = d;
      if (d) {
        this.router.navigate(['/dashboard']).then();
        console.log(this.d);
      }
    });
  }

}
