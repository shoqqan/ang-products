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
import { LowerCasePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, TitleCasePipe } from "@angular/common";
import { InputField } from "../create-product/create-product.component";
import { NzIconDirective } from "ng-zorro-antd/icon";

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
    NgIf,
    TitleCasePipe,
    LowerCasePipe,
    NgSwitchCase,
    NgForOf,
    NgSwitch,
    NzIconDirective,
    NgSwitchDefault
  ],
  templateUrl: "./edit-product.component.html",
  styleUrl: "./edit-product.component.scss"
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  profileForm!: FormGroup;
  product!: Product;
  id!: number;
  initialFormValues!: any;
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

  constructor(private productsService: ProductsService, private fb: NonNullableFormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params["id"]);
      this.loadProduct();
    });

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
    console.log("on init", this.profileForm.getRawValue());
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
    });
    for (const property in this.product.profile) {
      if (property !== "type" && property !== "available" && property !== "backlog") {
        let propertyInputType;
        switch (typeof property) {
          case "boolean":
            propertyInputType = "switch";
            break;
          case "number":
            propertyInputType = "number";
            break;
          default:
            propertyInputType = "text";
            break;
        }
        this.profileInputList.push({
          inputType: propertyInputType,
          label: property,
          formControlName: property,
          value: this.product.profile[property]
        });
      }
    }
    this.refreshProfileForm();
    this.initialFormValues = this.form.getRawValue(); // Сохранение исходных значений формы
  }

  refreshProfileForm() {
    Object.keys(this.profileForm.controls).forEach(controlName => {
      this.profileForm.removeControl(controlName);
    });
    this.profileInputList.forEach(input => {
      this.profileForm.addControl(input.formControlName, this.fb.control(input.value));
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
    this.profileForm.removeControl(inputField.formControlName);
  }

  getChangedValues() {
    const changedValues: any = {};
    const currentValues = this.form.getRawValue();
    for (const key in currentValues) {
      if (currentValues[key] !== this.initialFormValues[key]) {
        changedValues[key] = currentValues[key];
      }
    }
    changedValues.profile = this.profileForm.getRawValue();
    return changedValues;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const changedValues = this.getChangedValues();
    console.log(changedValues);
    console.log(this.profileInputList);
    this.productsService.updateProduct(this.id, changedValues).subscribe(() => {
      console.log("responce", JSON.stringify(changedValues));
    });
  }
}
