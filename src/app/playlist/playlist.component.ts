import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  tracks = [
    'track1',
    'track2'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
