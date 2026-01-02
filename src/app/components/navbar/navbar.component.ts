import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Version de la aplicacion
import packageInfo from '../../../../package.json';

@Component({
  selector: 'NavbarComponent',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // Version de la aplicacion
  public appVersion: string = packageInfo.version;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  //-------------------------------------------------------------------------------------------------------//
  // buscarPelicula todas las peliculas relacionadas con el string introducido                             //
  //-------------------------------------------------------------------------------------------------------//
  buscarPelicula(texto: string) {
    texto = texto.trim();
    if (texto.length === 0) {
      return;
    }
    this.router.navigate(['/buscar', texto]);
  }
}
