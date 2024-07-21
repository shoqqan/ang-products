import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from "@angular/core";
import { Product } from "../shared/product.model";
import { NzCardComponent } from "ng-zorro-antd/card";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzListGridDirective, NzListItemComponent } from "ng-zorro-antd/list";
import { ProductsService } from "../shared/services/products.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CurrencyPipe, NgForOf } from "@angular/common";
import {
  NzFilterTriggerComponent,
  NzTableComponent,
  NzThAddOnComponent,
  NzThMeasureDirective
} from "ng-zorro-antd/table";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzDropdownMenuComponent } from "ng-zorro-antd/dropdown";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-products-list",
  standalone: true,
  imports: [
    NzCardComponent,
    NzColDirective,
    NzListGridDirective,
    NzListItemComponent,
    NzRowDirective,
    NgForOf,
    NzThAddOnComponent,
    NzIconDirective,
    NzButtonComponent,
    NzInputDirective,
    NzDropdownMenuComponent,
    NzTableComponent,
    NzFilterTriggerComponent,
    FormsModule,
    CurrencyPipe,
    NzThMeasureDirective,
  ],
  templateUrl: "./products-list.component.html",
  styleUrl: "./products-list.component.scss"
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  private destroyRef = inject(DestroyRef);
  displayedProducts: Product[] = [];
  visible = false;
  searchValue = "";

  constructor(
    private productsService: ProductsService,
    private modal: NzModalService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(products => {
      this.products = products;
      this.updateDisplayedProducts(); // Ensure displayedProducts is updated
    });
  }

  reset(): void {
    this.searchValue = "";
    this.search();
  }

  search(): void {
    this.visible = false;
    this.updateDisplayedProducts(); // Ensure displayedProducts is updated
  }

  updateDisplayedProducts(): void {
    this.displayedProducts = this.products.filter(product =>
      product.name.includes(this.searchValue)
    );
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  navigateToProduct(id: number): void {
    this.router.navigate(["/edit", id]);
  }

  navigateToCreate() {
    this.router.navigateByUrl("/create");
  }

  onDelete(id: number): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      this.updateDisplayedProducts(); // Ensure displayedProducts is updated
    });
  }

  createDeleteModal(id: number, event: Event): void {
    event.stopPropagation();
    const modal: NzModalRef = this.modal.create({
      nzTitle: "Are you sure you want to delete this product?",
      nzFooter: [
        {
          label: "Close",
          shape: "round",
          onClick: () => modal.destroy()
        },
        {
          label: "Delete",
          type: "primary",
          danger: true,
          onClick: () => {
            this.onDelete(id);
            modal.destroy();
          }
        }
      ]
    });
  }
}
