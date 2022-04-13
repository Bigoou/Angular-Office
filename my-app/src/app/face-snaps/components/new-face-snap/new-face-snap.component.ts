import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FaceSnap } from '../../../core/models/face-snap.model';
import {FaceSnapsService} from '../../../core/services/face-snap.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex : RegExp;
  
  constructor(private faceSnapsServices: FaceSnapsService,
            private formBuilder : FormBuilder,
            private router : Router) { }

  

  ngOnInit(): void {
    this.urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.snapForm = this.formBuilder.group({
      title : [null, [Validators.required]],
      description : [null, [Validators.required]],
      imageUrl : [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location : [null],
    }, {
      updateOn: 'blur'
    });

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
          ...formValue,
          createdDate: new Date(),
          snaps: 0,
          id: 0
      }))
  );
  }

  onSubmitForm() {
    this.faceSnapsServices.addFaceSnap(this.snapForm.value).pipe(
        tap(() => this.router.navigateByUrl('/facesnaps'))
    ).subscribe();
}

}