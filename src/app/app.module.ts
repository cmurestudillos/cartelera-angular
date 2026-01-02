import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Modulos de la aplicacion
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ComponentsModule, PagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
