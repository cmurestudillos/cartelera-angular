import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// Version de la aplicacion
import packageInfo from '../../../../package.json';

/**
 * Barra de navegacion superior: logo, popover de info y buscador de peliculas.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
})
export class NavbarComponent {
  // Version de la aplicacion
  public appVersion: string = packageInfo.version;

  //-------------------------------------------------------------------------------------------------------//
  // buscarPelicula todas las peliculas relacionadas con el string introducido                             //
  //-------------------------------------------------------------------------------------------------------//
  public buscarPelicula(texto: string): void {
    texto = texto.trim();
    if (texto.length === 0) {
      return;
    }
    this.router.navigate(['/buscar', texto]);
  }

  private router = inject(Router);
}
