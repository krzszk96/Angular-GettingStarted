import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private _listFilter: string ='';
  pagetitle:string = 'Product List';
  errorMessage: string = ''
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];
    

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });    
  }

  performFilter(filterBy: string): Product[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) => 
      product.productName.toLocaleLowerCase().includes(filterBy));    
  }

  onRatingClicked(message: string): void{
    this.pagetitle = 'Product List' + message;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
