import { Component, OnInit } from "@angular/core";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzFormControlComponent, NzFormDirective, NzFormLabelComponent } from "ng-zorro-antd/form";
import { NzInputDirective } from "ng-zorro-antd/input";
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { NzSwitchComponent } from "ng-zorro-antd/switch";
import { ProductsService } from "../shared/services/products.service";

@Component({
  selector: "app-create-product",
  standalone: true,
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    NzFormLabelComponent,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NzInputNumberComponent,
    NzSwitchComponent
  ],
  templateUrl: "./create-product.component.html",
  styleUrl: "./create-product.component.scss"
})
export class CreateProductComponent implements OnInit {
  form!: FormGroup;

  constructor(private productsService: ProductsService, private fb: NonNullableFormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      sku: ["", Validators.required],
      type: ["furniture"],
      available: [true],
      backlog: [null],
      customProperties: this.fb.array([])
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const productData = {
      name: this.form.value.name,
      description: this.form.value.description,
      cost: this.form.value.cost,
      sku: this.form.value.sku,
      profile: {
        type: this.form.value.type,
        available: this.form.value.available,
        backlog: this.form.value.backlog
      }
    };
    console.log(productData);
    this.productsService.createProduct(productData).subscribe(() => this.router.navigateByUrl("/"));
  }
}
