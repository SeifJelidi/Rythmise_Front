import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  tracks = [
    'track1',
    'track1',
    'track1',
    'track1',

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
