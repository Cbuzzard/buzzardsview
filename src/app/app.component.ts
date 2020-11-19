import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  @ViewChild('grid') grid;
  @ViewChild('adimmer') adimmer;
  @ViewChild('profile') profile;
  @ViewChild('launchcode') launchcode;
  @ViewChild('calendar') calendar;
  @ViewChild('mealtime') mealtime;
  @ViewChild('readit') readit;
  @ViewChild('lights') lights;
  @ViewChild('calculator') calculator;
  @ViewChild('wave') wave;
  @ViewChild('projects') projects;
  @ViewChild('arrow') arrow;

  elementCurrentlyExpanded = null;

  clickDisabled = false;

  selectedCard;
  
  projectsAnimationPhase: number = 1;
  flipAnimationPhase: number = 0;
  dimmerPhase: number = 0;
  selectedCardPhase: number = 0;
  
  initialAnimation: boolean = true;
  enlargeAnimation: boolean = true;
  
  title = 'buzzardsview';

 

  elArr: Array<any>;

  ngAfterViewInit(): void {
    this.elArr = [
      this.profile,
      this.launchcode,
      this.calendar,
      this.mealtime,
      this.readit,
      this.lights,
      this.calculator,
      this.wave
    ]
  }

  animate(el) {
    if (this.selectedCard && this.elArr.includes(el)) return '';
    if (!this.clickDisabled) this.initialAnimation ? this.projectsAnimation() : this.flipAnimation(el);
  }

  flipAnimation(el) {
    if (this.flipAnimationPhase !== 0) {
      this.flipAnimationPhaseStep()
      this.clickDisabled = true;
      setTimeout(()=>{
        this.clickDisabled = false;
        this.flipAnimationPhaseStep(); this.selectedCard=null
      }, 400)
    } else {
      this.clickDisabled = true;
      this.selectedCard = el.el.nativeElement;
      this.flipAnimationPhaseStep()
      setTimeout(() => this.clickDisabled=false, 400)
    }
  }

  projectsAnimation() {
    this.projectsAnimationPhaseStep()
  }

  projectsAnimationPhaseStep() {
    this.projectsAnimationPhase = this.projectsAnimationPhase !== 3 ? this.projectsAnimationPhase+1 : 0;
    if (this.projectsAnimationPhase === 0 || this.projectsAnimationPhase === 2) setTimeout(()=>this.projectsAnimationPhaseStep(),1300);
    switch(this.projectsAnimationPhase) {
      case 0:
        window.scrollTo(0,0);
        (document.getElementsByTagName("BODY")[0] as HTMLElement).style.height = null;
        this.arrow.nativeElement.style.opacity = 0;
        this.arrow.nativeElement.style.display = 'none'
        this.initialAnimation = true;
        this.grid.nativeElement.classList.add('initial-transform-container')
        this.elArr.forEach(el => {
          el.el.nativeElement.style.transition = null;
          el.el.nativeElement.classList.remove('display-position')
        });
        break;
      case 1:
        this.enlargeAnimation = true;
        this.projects.nativeElement.style.pointerEvents = null;
        this.projects.nativeElement.style.opacity = null;
        break;
      case 2:
        (document.getElementsByTagName("BODY")[0] as HTMLElement).style.height = 'fit-content';
        this.clickDisabled = true;
        this.enlargeAnimation = false;
        this.grid.nativeElement.classList.remove('enlarge')
        this.projects.nativeElement.style.opacity = 0;
        this.projects.nativeElement.style.pointerEvents = 'none'
        this.elArr.forEach(el => {
          el.el.nativeElement.classList.add('display-position')
          el.el.nativeElement.style.transform = 'rotate(0)'
        });
        break;
      case 3:
        this.clickDisabled = false;
        this.arrow.nativeElement.style.opacity = 1;
        this.arrow.nativeElement.style.display = 'block'
        this.elArr.forEach(el => el.el.nativeElement.style.transitionDelay = '0s')
        this.grid.nativeElement.classList.remove('initial-transform-container')
        this.elArr.forEach(el => {
          el.el.nativeElement.style.transition = 'transform .2s ease-in-out'
          el.el.nativeElement.style.transform = null
        })
        this.initialAnimation = false
        break;
    }
  }

  flipAnimationPhaseStep() {
    this.flipAnimationPhase = this.flipAnimationPhase !==2 ? this.flipAnimationPhase+1 : 0;
    this.dimmerPhaseStep()
    this.selectedCardPhaseStep();
  }

  dimmerPhaseStep() {
    this.dimmerPhase = this.dimmerPhase !== 2 ? this.dimmerPhase+1 : 0;
    switch(this.dimmerPhase) {
      case 0:
        this.adimmer.nativeElement.style.zIndex = null;
        this.adimmer.nativeElement.style.visibility = 'hidden';
        break;
      case 1:
        this.adimmer.nativeElement.style.zIndex = 5;
        this.adimmer.nativeElement.style.visibility = 'visible';
        this.adimmer.nativeElement.style.opacity = 1;
        break;
      case 2:
        this.adimmer.nativeElement.style.opacity = 0;
        break;
    }
  }

  selectedCardPhaseStep() {
    this.selectedCardPhase = this.selectedCardPhase !== 2 ? this.selectedCardPhase+1 : 0;
    switch(this.selectedCardPhase) {
      case 0:
        this.selectedCard.style.zIndex = null;
        this.selectedCard.classList.add('clickable');
        this.selectedCard.style.transition = 'transform .2s ease-in-out';
        this.selectedCard.classList.add('hover');
        break;
      case 1:
        let dim = this.selectedCard.getBoundingClientRect();
        let windowWidthCenter = document.documentElement.clientWidth/2;
        let windowHeightCenter = window.innerHeight/2;
        let moveX = (windowWidthCenter - dim.left) - (dim.width/2);
        let moveY = (windowHeightCenter - dim.top) - (dim.height/2);
        this.selectedCard.querySelector('.back').style.transform = 'rotateY(180deg)';
        this.selectedCard.querySelector('.logocontainer').style.transform = 'rotateY(180deg)';
        this.selectedCard.classList.remove('clickable');
        this.selectedCard.style.zIndex = 6;
        this.selectedCard.style.transition = 'transform .4s ease-in-out';
        this.selectedCard.style.transform = windowWidthCenter >= 385 ? 
        `translate(${moveX}px, ${moveY}px) rotateY(180deg) scale(1.8)` : 
        `translate(${moveX}px, ${moveY}px) rotateY(180deg) scale(1.2)`;
        break;
      case 2:
        this.selectedCard.classList.remove('hover');
        this.selectedCard.style.transform = null;
        this.selectedCard.querySelector('.back').style.transform = null;
        this.selectedCard.querySelector('.logocontainer').style.transform = null;
        break;
    }
  }

  mouseOver() {
    if (this.enlargeAnimation) {
      this.grid.nativeElement.classList.add('enlarge')
    }
  }

  mouseOut() {
    if (this.enlargeAnimation) {
      this.grid.nativeElement.classList.remove('enlarge')
    }
  }

}
