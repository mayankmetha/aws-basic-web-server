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
        observer.next(<Book[]>data);
      },
      error => {
        observer.error(error)
      },
      () => {
        observer.complete();
      })
    });
  }

  public deleteBooks(isbn: string, quantity: number): Observable<Book[]> {
    var book = {
      "isbn": isbn,
      "quantity" : quantity
    };
    return new Observable<Book[]>(observer => {
      this.httpService.delete('books',book).subscribe(data => {
        observer.next(<Book[]>data)
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
