import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
// Slideshow
import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';
// Modelo de datos
import { Cast } from '../../interfaces/credits';
// Pipes
import { PosterPipe } from '../../pipes/poster.pipe';

/**
 * Carrusel (Swiper) con el reparto de una pelicula.
 */
@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [PosterPipe],
})
export class CastSlideshowComponent implements AfterViewInit {
  @Input() public cast: Cast[] = [];

  public ngAfterViewInit(): void {
    new Swiper('.swiper', {
      modules: [FreeMode],
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15,
    });
  }
}
