import { Component, OnInit } from "@angular/core";
import { NzContentComponent, NzHeaderComponent, NzLayoutComponent } from "ng-zorro-antd/layout";
import { ProductsListComponent } from "../products/products-list/products-list.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    ProductsListComponent,
    RouterOutlet
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {


}
