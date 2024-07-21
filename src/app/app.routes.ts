import { Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { loggedInGuard } from "./core/guards/logged-in/logged-in.guard";
import { HomeComponent } from "./home/home.component";
import { notLoggedInGuard } from "./core/guards/not-logged-in/not-logged-in.guard";
import { ProductsListComponent } from "./products/products-list/products-list.component";
import { CreateProductComponent } from "./products/create-product/create-product.component";
import { EditProductComponent } from "./products/edit-product/edit-product.component";

export const routes: Routes = [
  {path: "login", component: AuthComponent, canActivate: [loggedInGuard]},
  {
    path: "", component: HomeComponent, canActivate: [notLoggedInGuard], children: [
      {path: "", component: ProductsListComponent},
      {path: "create", component: CreateProductComponent},
      {path: "edit/:id", component: EditProductComponent},
    ]
  },

];
