import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  public title: string;
  public books: Book[];
  public quantity: string;
  public errorText: string;
  public selectedBook = {};
  public loading = false;
  public bookAdded = false;

  constructor(private booksService: BooksService) {
    this.title = "BookKart Seller";
  }

  ngOnInit() {
    this.search();
  }

  public search(): void {
    this.loading = true;
    this.booksService.getAllBooks().subscribe(
      books => {
        this.books = books;
        this.loading = false;
      },
      error => {
        console.error("Failed to get books: ",error);
        this.errorText = error.error;
        this.loading = false;
      }
    );
  }

  public optionSelected(option) {
    for(let book of this.books) {
      if(book.isbn === option.option.value) {
        this.selectedBook = book;
        break;
      }
    }
  }

  public addBook(): void {
    this.loading = true;
    this.errorText = undefined;
    this.booksService.addBook(<Book>this.selectedBook).subscribe(data => {
      this.bookAdded = true;
      this.selectedBook = {};
      this.loading = false;
    }, error => {
      this.selectedBook = {};
      this.errorText = error.error;
      this.loading = false;
    });
  }

}
