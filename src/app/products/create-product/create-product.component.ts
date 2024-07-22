import { Component, OnInit } from "@angular/core";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzFormControlComponent, NzFormDirective, NzFormLabelComponent } from "ng-zorro-antd/form";
import { NzInputDirective, NzInputGroupComponent } from "ng-zorro-antd/input";
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { NzSwitchComponent } from "ng-zorro-antd/switch";
import { ProductsService } from "../shared/services/products.service";
import { LowerCasePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from "@angular/common";
import { NzIconDirective } from "ng-zorro-antd/icon";

export interface InputField {
  inputType: string
  formControlName: string,
  label: string
  value?: any
}

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
    NzSwitchComponent,
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    LowerCasePipe,
    TitleCasePipe,
    NgSwitchDefault,
    NzInputGroupComponent,
    NzIconDirective
  ],
  templateUrl: "./create-product.component.html",
  styleUrl: "./create-product.component.scss"
})
export class CreateProductComponent implements OnInit {
  form!: FormGroup;
  profileForm!: FormGroup;
  profileInputList: InputField[] = [
    {
      label: "Type",
      formControlName: "type",
      inputType: "select",
      value: ["part", "furniture", "stationary", "equipment"]
    },
    {
      label: "Available",
      formControlName: "available",
      inputType: "switch",
      value: true
    },
    {
      label: "Backlog",
      formControlName: "backlog",
      inputType: "number",
      value: null
    },
  ];

  constructor(private productsService: ProductsService, private fb: NonNullableFormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      sku: ["", Validators.required]
    });
    this.profileForm = this.fb.group({
      type: ["furniture"],
      available: [true],
      backlog: [null],
    });
  }

  refreshProfileForm() {
    this.profileInputList.forEach(input => {
      this.profileForm.addControl(input.formControlName, this.fb.control(""));
    });
  }

  addInputField() {
    const formControlName = prompt("FormControlName input: ");
    const label = prompt("Label input: ");
    this.profileInputList.push({inputType: "text", formControlName: formControlName!, label: label!});
    this.refreshProfileForm();
  }

  removeInputField(inputField: InputField) {
    this.profileInputList = this.profileInputList.filter(field => field !== inputField);
    this.refreshProfileForm();
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
        ...this.profileForm.value
      }
    };
    this.productsService.createProduct(productData).subscribe(() => this.router.navigateByUrl("/"));
  }
}
