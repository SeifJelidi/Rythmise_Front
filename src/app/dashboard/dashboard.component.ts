import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  playlists = [];
  connectedSpotify;
  connectURL;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headerDict = {
      Authorization: 'Bearer ' + token
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.httpClient.get<any>('https://rythmize.herokuapp.com/api/v1/clients/spotify/playlists/', requestOptions)
      .subscribe(playlists => {
        console.log(playlists);
        this.playlists = playlists;
      });

    this.httpClient.get<any>('https://rythmize.herokuapp.com/api/v1/auth/connect/spotify/status', requestOptions)
      .subscribe(() => {
        this.connectedSpotify = true;
      },
        (e) => {
        this.connectedSpotify = false;
        this.connectURL = e.error.url;
        });
  }

}
