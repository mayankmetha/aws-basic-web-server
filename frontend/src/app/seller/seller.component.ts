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

  constructor(private booksService: BooksService) {
    this.title = "BookKart Seller";

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
    );
  }

}
