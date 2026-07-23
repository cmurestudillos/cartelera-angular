import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Configuracion EndPoint API
import { Global } from '../conf/global';
// Operadores
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// Modelado de datos
import { CarteleraResponse, Movie } from '../interfaces/cartelera';
import { MovieResponse } from '../interfaces/movie';
import { Cast, CreditsReponse } from '../interfaces/credits';

/**
 * Cliente de la API de TMDB: cartelera paginada, busqueda, detalle y reparto de peliculas.
 */
@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  public cargando = false;

  public get params(): { api_key: string; language: string; page: string } {
    return {
      api_key: Global.urlKey,
      language: Global.urlLgn,
      page: this.carteleraPage.toString(),
    };
  }

  public resetCarteleraPage(): void {
    this.carteleraPage = 1;
  }

  //-------------------------------------------------------------------------------------------------------//
  // Obtenemos las peliculas en cartelera                                                                  //
  //-------------------------------------------------------------------------------------------------------//
  public getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      // cargando peliculas
      return of([]);
    }

    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${Global.urlApi}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map(resp => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }
  //-------------------------------------------------------------------------------------------------------//
  // Buscador de peliculas                                                                                 //
  //-------------------------------------------------------------------------------------------------------//
  public buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto };
    return this.http
      .get<CarteleraResponse>(`${Global.urlApi}/search/movie`, {
        params,
      })
      .pipe(map(resp => resp.results));
  }
  //-------------------------------------------------------------------------------------------------------//
  //Obtenemos los datos especificos de una pelicula                                                        //
  //-------------------------------------------------------------------------------------------------------//
  public getPeliculaDetalle(id: string): Observable<MovieResponse | null> {
    return this.http
      .get<MovieResponse>(`${Global.urlApi}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError(() => of(null)));
  }
  //-------------------------------------------------------------------------------------------------------//
  //Obtenemos los actores de la pelicula                                                                   //
  //-------------------------------------------------------------------------------------------------------//
  public getCast(id: string): Observable<Cast[]> {
    return this.http
      .get<CreditsReponse>(`${Global.urlApi}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map(resp => resp.cast),
        catchError(() => of([]))
      );
  }

  private http = inject(HttpClient);
  private carteleraPage = 1;
}
