import { Component, Input } from "@angular/core";
import { NzListGridDirective, NzListItemComponent } from "ng-zorro-antd/list";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzCardComponent } from "ng-zorro-antd/card";
import { Profile } from "./product.model";
import { CurrencyPipe, DecimalPipe } from "@angular/common";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [
    NzListGridDirective,
    NzRowDirective,
    NzColDirective,
    NzCardComponent,
    NzListItemComponent,
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss"
})
export class ProductComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() cost: number;
  @Input() profile?: Profile;

  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.cost = 0;
    this.profile = {
      type: "furniture",
      available: true,
      backlog: 0
    };
  }
}
