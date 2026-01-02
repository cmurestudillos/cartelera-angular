import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/cartelera';

@Component({
  selector: 'PeliculasPosterGridComponent',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() peliculas: Movie[];

  constructor( private router: Router ) { }

  ngOnInit(): void {
    // console.log(this.peliculas);
  }

  onMovieClick( movie: Movie ) {
    this.router.navigate(['/pelicula', movie.id ]);
  }

}
