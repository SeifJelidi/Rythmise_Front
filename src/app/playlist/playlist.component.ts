import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  tracks = [];
  constructor(private route: ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    const playlistID = this.route.snapshot.params.id;
    const token = localStorage.getItem('token');
    const headerDict = {
      Authorization: 'Bearer ' + token
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.httpClient.get<any[]>('https://rythmize.herokuapp.com/api/v1/clients/spotify/playlists/'
      + playlistID + '/tracks', requestOptions)
      .subscribe(tracks => {
        this.tracks = tracks;
        console.log(tracks);
      });
  }

  onDashboard(): void {
    this.router.navigate(['/dashboard']).then();
  }

}
