import { Injectable } from '@angular/core';
import {Slider} from '../models/slider.model'
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SliderService {

  public myValue: any=1;
  public niveauDisplay : boolean;
  public sliderForm : FormGroup;
  
  private numberPreview$ : Observable<number>;


  constructor(private formBuilder : FormBuilder) { }

  /* To display the slider value */

  public view() {
    if(this.niveauDisplay) {
      this.niveauDisplay = false;
    } else {
      this.niveauDisplay = true;
    }
    console.log(this.niveauDisplay);
  }

  /* Action when submitting the form */

  public onSubmit() {
    console.log(this.sliderForm.value);
  }

}
