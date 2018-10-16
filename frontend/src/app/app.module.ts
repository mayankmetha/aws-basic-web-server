import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouter } from './app.router';
import { MatToolbarModule, MatCardModule, MatButtonModule, MatPaginatorModule,
         MatIconModule, MatIconRegistry, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from './service/books.service';
import { HttpService } from './service/http.service';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    AppRouter,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [
    HttpService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}
