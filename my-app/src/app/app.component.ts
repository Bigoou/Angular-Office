import { Component, OnInit } from '@angular/core';
import { FaceSnap } from './core/models/face-snap.model'
import { interval, Observable, of } from 'rxjs';
import { concatMap, mergeMap, delay, exhaustMap, map, switchMap, take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  interval$ : Observable<string>;
 
  logger(text: string): void {
    console.log(`text: ${text}`);
  }
  ngOnInit() {
    // this.interval$ = interval(1000).pipe(
    //   filter(value => value % 3 === 0),
    //   map(value => value % 2 === 0 ?
    //     `${value} pair` : `${value} impair`
    //     ),
    //     tap(text => this.logger(text))
    // );
  }
}
