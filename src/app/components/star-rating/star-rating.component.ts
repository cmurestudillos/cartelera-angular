import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Componente de valoracion por estrellas.
 * Sustituye a la libreria `ng-starrating` (abandonada, sin soporte para Angular Ivy/standalone).
 */
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class StarRatingComponent {
  @Input() public value = 0;
  @Input() public totalStars = 10;

  public get stars(): number[] {
    return Array.from({ length: this.totalStars }, (_, i) => i + 1);
  }
}
