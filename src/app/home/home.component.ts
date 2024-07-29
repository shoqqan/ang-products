import { Component } from "@angular/core";
import { NzContentComponent, NzHeaderComponent, NzLayoutComponent } from "ng-zorro-antd/layout";
import { ProductsListComponent } from "../products/products-list/products-list.component";
import { Router, RouterOutlet } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { AuthService } from "../auth/shared/services/auth.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    ProductsListComponent,
    RouterOutlet,
    NzButtonComponent,
    NzIconDirective,
  ],

  providers: [NzModalService],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {
  }

  public navigateToHome() {
    this.router.navigateByUrl("/");
  };

  public logout() {
    this.authService.signOut();
    this.router.navigateByUrl("/login");
  }
}
