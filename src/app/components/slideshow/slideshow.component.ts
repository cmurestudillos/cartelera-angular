import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
// Slideshow
import Swiper from 'swiper';
// Modelo de datos
import { Movie } from '../../interfaces/cartelera';

@Component({
  selector: 'SlideshowComponent',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() peliculas: Movie[];

  public mySwiper: Swiper;

  constructor() {}

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {
    // console.log(this.peliculas);
  }

  onSlideNext() {
    this.mySwiper.slideNext();
  }

  onSlidePrev() {
    this.mySwiper.slidePrev();
  }
}
