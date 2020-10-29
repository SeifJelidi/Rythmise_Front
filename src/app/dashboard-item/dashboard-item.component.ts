import {Component, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {

  @Input() playlist;
  playlistID;
  service;
  title;
  tracks;
  selected = false;
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.playlistID = Object.keys(this.playlist)[0];
    const pl = Object.values(this.playlist)[0];
    // @ts-ignore
    this.service = pl.service;
    // @ts-ignore
    this.title = pl.title;
    // @ts-ignore
    this.tracks = pl.tracks;
  }

  selectedPlaylist(): void {
    this.selected = !this.selected;
  }

  enterPlaylist(): void {
    this.router.navigate(['../playlist/' + this.playlistID]).then();
  }

}
