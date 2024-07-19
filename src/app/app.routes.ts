import { Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { loggedInGuard } from "./core/guards/logged-in/logged-in.guard";
import { HomeComponent } from "./home/home.component";
import { notLoggedInGuard } from "./core/guards/not-logged-in/not-logged-in.guard";

export const routes: Routes = [
  {path: "login", component: AuthComponent, canActivate: [loggedInGuard]},
  {path: "home", component: HomeComponent, canActivate: [notLoggedInGuard]},

];
