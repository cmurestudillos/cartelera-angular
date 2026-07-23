import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Componente raiz de la aplicacion: navbar fijo + router-outlet con las paginas.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterOutlet, NavbarComponent],
})
export class AppComponent {}
