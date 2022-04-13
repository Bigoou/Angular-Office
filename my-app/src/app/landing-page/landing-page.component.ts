import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  userEmail: string;

  constructor() { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
