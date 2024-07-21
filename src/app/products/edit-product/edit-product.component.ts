import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product } from "../shared/product.model";
import { ProductsService } from "../shared/services/products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzFormControlComponent, NzFormDirective, NzFormLabelComponent } from "ng-zorro-antd/form";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzSwitchComponent } from "ng-zorro-antd/switch";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-edit-product",
  standalone: true,
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzInputDirective,
    NzInputNumberComponent,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzSwitchComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: "./edit-product.component.html",
  styleUrl: "./edit-product.component.scss"
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  product!: Product;
  id!: number;
  initialFormValues!: any;

  constructor(
    private productsService: ProductsService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params["id"]);
      this.loadProduct();
    });
  }

  loadProduct(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.product = products.find(product => product.id === this.id)!;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      cost: [this.product.cost, [Validators.required, Validators.min(0)]],
      sku: [this.product.sku, Validators.required],
      type: [this.product.profile.type],
      available: [this.product.profile.available],
      backlog: [this.product.profile.backlog],
    });

    this.initialFormValues = this.form.getRawValue(); // Сохранение исходных значений формы
  }

  getChangedValues() {
    const changedValues: any = {};
    const currentValues = this.form.getRawValue();

    for (const key in currentValues) {
      if (currentValues[key] !== this.initialFormValues[key]) {
        changedValues[key] = currentValues[key];
      }
    }

    return changedValues;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const changedValues = this.getChangedValues();
    if (Object.keys(changedValues).length > 0) {
      this.productsService.updateProduct(this.id, changedValues).subscribe(() => this.router.navigateByUrl("/"));
    }
  }
}
