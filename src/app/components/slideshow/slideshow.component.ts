import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgStyle, SlicePipe } from '@angular/common';
// Slideshow
import Swiper from 'swiper';
// Modelo de datos
import { Movie } from '../../interfaces/cartelera';

/**
 * Carrusel (Swiper) de peliculas destacadas con fondo e imagen de sinopsis.
 */
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgStyle, SlicePipe],
})
export class SlideshowComponent implements AfterViewInit {
  @Input() public peliculas: Movie[] = [];

  public mySwiper!: Swiper;

  public ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper', {
      loop: true,
    });
  }

  public onSlideNext(): void {
    this.mySwiper.slideNext();
  }

  public onSlidePrev(): void {
    this.mySwiper.slidePrev();
  }
}
