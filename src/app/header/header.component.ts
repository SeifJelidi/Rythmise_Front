import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  connected;
  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
    this.authService.isSessionID.subscribe(d => this.connected = d);
    const token = localStorage.getItem('token');
    const headerDict = {
      Authorization: 'Bearer ' + token
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.httpClient.get('https://rythmize.herokuapp.com/api/v1/auth/validate/jwt', requestOptions)
      .subscribe(() => {
          this.authService.isSessionID.next(true);
        },
        () => {
          this.authService.isSessionID.next(false);
        });
  }

  ngOnInit(): void {
  }

  isUndefined(): boolean {
    return typeof this.connected === 'undefined';
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.authService.isSessionID.next(false);
  }

  onSignIn(): void {
    this.connected = true;
  }

}
