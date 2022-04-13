import { Component, OnInit } from '@angular/core';
import {Slider} from '../core/models/slider.model'
import {SliderService} from '../core/services/slider.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FaceSnap } from '../core/models/face-snap.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FaceSnapsService } from '../core/services/face-snap.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {


  public sliderForm : FormGroup;
  private numberPreview$ : Observable<number>;
  public myValue: any=1;
  public niveauDisplay : boolean;


  constructor(private faceSnapsServices: FaceSnapsService,
    private formBuilder : FormBuilder) { }

  
  
  // formatLabel(value: number) {
  //   if (value >= 1000) {
  //     return Math.round(value / 1000) + 'k';
  //   }

  //   return value;
  // }

//     getSliderValue(event:any=1) {
//     this.myValue = event.target.value
//     console.log(this.myValue );
//       // for (let i = 0; i < this.myValue; i++) {
//       //   this.answersForm.addControl(i, this.formBuilder.control(''));
//       // }   
//  }

  private  view() {
    if(this.niveauDisplay) {
      this.niveauDisplay = false;
    } else {
      this.niveauDisplay = true;
    }
    console.log(this.niveauDisplay);
  }

  private initForm() {
    this.sliderForm = this.formBuilder.group({
      title : [null],
      maxRange : [null],
      color : 'green',
    });
  }

  ngOnInit() {

    this.niveauDisplay = false;

    this.initForm();

    this.numberPreview$ = this.sliderForm.valueChanges.pipe(
      map(formValue => ({
          ...formValue,
      }))
    );
  }
  // onSubmit() {
  //   console.log(this.sliderForm.value);
  // }
  
  // createRange(number : any){
  //   return new Array(number);
  // }
}
