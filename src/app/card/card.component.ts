import { Component, OnInit, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('openClose', [
      state('closed', style({
        transform: 'translate(0, 0)'
      })),
      state('open', style({
        transform: `translate(50px, 50px)`
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ])
  ],
})
export class CardComponent implements OnInit {

  isOpen = false;

  x = 20;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    console.log(this.el.nativeElement.getBoundingClientRect());
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  calculateTranslation() {
    let elDimensions = this.el.nativeElement.getBoundingClientRect();
    let windowWidthCenter = window.innerWidth/2;
    let windowHeightCenter = window.innerHeight/2;

    let x = (windowWidthCenter - elDimensions.left) - (elDimensions.width/2);
    let y = (windowHeightCenter - elDimensions.top) - (elDimensions.height/2);

    return `${x}px ${y}px`
  }


}
