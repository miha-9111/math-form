import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from "@angular/forms";
import { map, filter } from "rxjs";

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective implements OnInit{

  constructor(private el: ElementRef,
              private controlName: NgControl) {}

  ngOnInit() {
    this.controlName.control?.parent?.valueChanges
      .pipe(
        map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))),
        filter(value => value < 0.2)
      )
      .subscribe((value) => {
        console.log(value);
      })
  }
}
