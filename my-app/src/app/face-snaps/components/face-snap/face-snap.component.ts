import { Component, OnInit, Input } from '@angular/core';
import {FaceSnap} from '../../../core/models/face-snap.model'
import {FaceSnapsService} from '../../../core/services/face-snap.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})



export class FaceSnapComponent implements OnInit {

  constructor(private faceSnapsServices: FaceSnapsService,
              private router: Router) {}

  @Input() faceSnap: FaceSnap;

  title: string;
  description: string;
  createdDate: Date;
  snaps: number;
  imageUrl: string;
  snapped: boolean;
  buttonText: string;

  ngOnInit() {
    this.title = 'Archibald';
    this.description = 'Mon meilleur ami depuis tout petit !';
    this.createdDate = new Date();
    this.snaps = 640.25;
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg';
    this.snapped = false;
    this.buttonText = 'Voter';
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
}

  onAddSnap() {
    if(!this.faceSnap.snapped) {
      this.faceSnapsServices.snapFaceSnapById(this.faceSnap.id, 'snap');
    }else {
      this.faceSnapsServices.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    }

  }
}
