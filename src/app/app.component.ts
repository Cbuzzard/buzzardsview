import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buzzardsview';
  elementCurrentlyExpanded = null;

  @ViewChild('dimmer') dimmer;

  calculateTranslation(el) {
    this.dimmer.nativeElement.style.zIndex=5;
    let windowWidthCenter = window.innerWidth/2;
    let windowHeightCenter = window.innerHeight/2;

    if (this.elementCurrentlyExpanded) {
      this.elementCurrentlyExpanded.classList.remove('hover')
      this.dimmer.nativeElement.style.opacity = 0;
      this.elementCurrentlyExpanded.style.transition = 'transform .4s ease-in-out';
      this.elementCurrentlyExpanded.style.transform = null;
      this.elementCurrentlyExpanded.querySelector('.back').style.transform = null;
      this.elementCurrentlyExpanded.querySelector('.logocontainer').style.transform = null
      setTimeout(()=>{
        this.elementCurrentlyExpanded.style.zIndex = null;
        this.dimmer.nativeElement.style.zIndex= null;
        this.elementCurrentlyExpanded.style.transition = 'transform .2s ease-in-out';
        this.elementCurrentlyExpanded.classList.add('hover')
        this.elementCurrentlyExpanded = null;
        this.dimmer.nativeElement.style.visibility = 'hidden';
      }, 400)
    } else {
      el = el.el.nativeElement;
      el.querySelector('.back').style.transform = 'rotateY(180deg)'
      el.querySelector('.logocontainer').style.transform = 'rotateY(180deg)'
      let elDimensions = el.getBoundingClientRect();
      let windowWidthCenter = window.innerWidth/2;
      let windowHeightCenter = window.innerHeight/2;
      let x = (windowWidthCenter - elDimensions.left) - (elDimensions.width/2);
      let y = (windowHeightCenter - elDimensions.top) - (elDimensions.height/2);
      el.style.transition = 'transform .4s ease-in-out';
      if(windowWidthCenter <= 385) {
        el.style.transform = `translate(${x}px, ${y}px) rotateY(180deg) scale(1.2)`;   
      } else {
        el.style.transform = `translate(${x}px, ${y}px) rotateY(180deg) scale(2)`;
      }
      setTimeout(() => {
        el.style.transition = 'transform .2s ease-in-out'
      }, 400);
      el.style.zIndex=6;
      this.dimmer.nativeElement.style.visibility = 'visible';
      this.dimmer.nativeElement.style.opacity = 1;
      this.elementCurrentlyExpanded = el;
    }
  }
}
