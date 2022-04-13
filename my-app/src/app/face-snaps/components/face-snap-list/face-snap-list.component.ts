import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { tap, take, takeUntil } from 'rxjs/operators';
import { FaceSnap } from '../../../core/models/face-snap.model'
import {FaceSnapsService} from '../../../core/services/face-snap.service'

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnaps$ : Observable<FaceSnap[]>

  constructor(private faceSnapsService: FaceSnapsService) { }

  faceSnaps : FaceSnap[];
  private destroy$ : Subject<boolean>;

  ngOnInit() {
    // this.destroy$ = new Subject<boolean>();
    // this.faceSnaps =  this.faceSnapsService.faceSnaps;
    // interval(1000).pipe(
    //   // take(3),
    //   tap(console.log),takeUntil(this.destroy$)).subscribe();
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnap();
  }

  ngOnDestroy(): void {
    // this.destroy$.next(true);
  }
}
