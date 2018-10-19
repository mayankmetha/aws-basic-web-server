import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BooksService } from 'src/app/service/books.service';
import { Book } from 'src/app/model/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public books: Book[];
  public searchText = '';
  public errorText: string;
  public title: string;
  public searchInProg = false;

  constructor(private booksService: BooksService) {
    this.books = [];
    this.title = "BookKart"
  }

  ngOnInit() {
    this.search();
  }

  public search(): void {
    this.errorText = undefined;
    this.searchInProg = true;
    let obs = undefined;
    this.books = [];
    if (!this.searchText) {
      obs = this.booksService.getAllBooks();
    } else {
      obs = this.booksService.getBooks(this.searchText);
    }

    obs.subscribe(
      books => {
        this.books = books;
        this.searchInProg = false;
      },
      error => {
        console.error("Failed to get books: ", error);
        this.errorText = error.error;
        this.searchInProg = false;
      }
    );
  }

  public buy(isbn, quantity): void {
    this.booksService.deleteBooks(isbn, quantity).subscribe(
      books => {
        this.search();
      },
      error => {
        console.error("Failed to buy books: ", error);
        this.errorText = error;
      }
    );
  }
}
