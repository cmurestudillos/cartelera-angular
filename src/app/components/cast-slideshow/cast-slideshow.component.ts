import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
// Slideshow
import Swiper from 'swiper';
// Modelo de datos
import { Cast } from '../../interfaces/credits';

@Component({
  selector: 'CastSlideshowComponent',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: [],
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {
  @Input() cast: Cast[];

  constructor() {}

  ngOnInit(): void {
    // console.log(this.cast);
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15,
    });
  }
}
