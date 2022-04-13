import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap.model';
import {ActivatedRoute} from '@angular/router'
import {FaceSnapsService} from '../../../core/services/face-snap.service';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap : FaceSnap;
  faceSnap$ : Observable<FaceSnap>;
  buttonText : string;

  constructor(private faceSnapsServices : FaceSnapsService,
    private route: ActivatedRoute) { }

    onSnap (faceSnapId: number) {
      if (this.buttonText === 'Oh Snap!') { 
        this.faceSnapsServices.snapFaceSnapById(faceSnapId, 'snap').pipe(
          tap(() => {
            this.faceSnap$ = this.faceSnapsServices.getFaceSnapById(faceSnapId);
            this.buttonText = 'Oops, unSnap!';
          })
        ).subscribe();
      } else {
        this.faceSnapsServices.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
          tap(() => {
            this.faceSnap$ = this.faceSnapsServices.getFaceSnapById(faceSnapId);
            this.buttonText = 'Oh Snap!';
          })
        ).subscribe();
      }
    }

  ngOnInit() {
    this.buttonText = 'Oh Snap!' ;
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsServices.getFaceSnapById(faceSnapId)

  }

  onAddSnap() {
    if(!this.faceSnap.snapped) {
      this.faceSnapsServices.snapFaceSnapById(this.faceSnap.id, 'snap');
    }else {
      this.faceSnapsServices.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    }

  }
}
