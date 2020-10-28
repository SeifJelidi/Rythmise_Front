import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  connected = false;
  constructor() {
    this.connected = localStorage.getItem('token') != null;
  }

  ngOnInit(): void {
  }

  onSignIn(): void {
    this.connected = true;
  }

}
