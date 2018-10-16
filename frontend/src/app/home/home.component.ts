import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/service/books.service';
import { Book } from 'src/app/model/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public books: Book[];
  public searchText: string;
  public errorText: string;
  public title: string;

  constructor(private booksService: BooksService) {
    this.books = [];
    this.title = "BookKart"
  }

  ngOnInit() {
    this.search();
  }

  public search(): void {
    this.booksService.getAllBooks().subscribe(
      books => {
        this.books = books;
      },
      error => {
        console.error("Failed to get books: ",error);
        this.errorText = error;
      }
    )
  }
}
