import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Book } from '../model/book.model';
import { Observable } from 'rxjs';

@Injectable()
export class BooksService {

  constructor(private httpService: HttpService) { }

  public getAllBooks(): Observable<Book[]> {
    return new Observable<Book[]>(observer => {
      this.httpService.get('books').subscribe(data => {
        observer.next(<Book[]>data.books);
      },
      error => {
        observer.error(error)
      },
      () => {
        observer.complete();
      })
    });
  }
}
