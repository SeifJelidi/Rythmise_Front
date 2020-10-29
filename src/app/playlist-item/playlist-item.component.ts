import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  @Input() track;
  @Output() trackToDelete = new EventEmitter();
  title;
  artist;
  album;
  duration;
  service;
  selected = false;
  add = false;
  playlistName;
  trackID;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.trackID = Object.keys(this.track)[0];
    // @ts-ignore
    this.title = Object.values(this.track)[0].title;
    // @ts-ignore
    this.artist = Object.values(this.track)[0].artist;
    // @ts-ignore
    this.album = Object.values(this.track)[0].album;
    // @ts-ignore
    this.duration = Object.values(this.track)[0].duration;
    // @ts-ignore
    this.service = Object.values(this.track)[0].service;
  }

  selectedTrack(): void {
    this.selected = !this.selected;
  }

  addToPlaylist(): void {
    this.add = !this.add;
  }

  submitAdd(): void {
    const token = localStorage.getItem('token');
    const headerDict = {
      Authorization: 'Bearer ' + token
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.httpClient.post('https://rythmize.herokuapp.com/api/v1/clients/spotify/playlist/transfer', {
      playlist: this.playlistName,
      tracks: [{track: this.title, artist: this.artist}]
    }, requestOptions)
      .subscribe(data => console.log(data));
  }

}
