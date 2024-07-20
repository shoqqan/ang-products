import { Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { Product } from "../product/product.model";
import { NzCardComponent } from "ng-zorro-antd/card";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzListGridDirective, NzListItemComponent } from "ng-zorro-antd/list";
import { ProductsService } from "../shared/services/products.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ProductComponent } from "../product/product.component";
import { NgForOf } from "@angular/common";

@Component({
  selector: "app-products-list",
  standalone: true,
  imports: [
    NzCardComponent,
    NzColDirective,
    NzListGridDirective,
    NzListItemComponent,
    NzRowDirective,
    ProductComponent,
    NgForOf
  ],
  templateUrl: "./products-list.component.html",
  styleUrl: "./products-list.component.scss"
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  private destroyRef = inject(DestroyRef);

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(products => {
      this.products = products;
    });
  }
}
