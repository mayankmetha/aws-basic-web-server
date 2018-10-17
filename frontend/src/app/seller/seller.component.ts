import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  public title: string;

  constructor() { 
    this.title = "BookKart Seller";
  }

  ngOnInit() {
  }

}
