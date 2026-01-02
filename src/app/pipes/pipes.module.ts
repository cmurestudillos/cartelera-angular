import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Pipes
import { PosterPipe } from './poster.pipe';

@NgModule({
  declarations: [PosterPipe],
  exports: [PosterPipe],
  imports: [CommonModule],
})
export class PipesModule {}
