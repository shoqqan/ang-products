import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { NzInputDirective, NzInputGroupComponent } from "ng-zorro-antd/input";
import { NzFormControlComponent, NzFormDirective } from "ng-zorro-antd/form";
import { NzCheckboxComponent } from "ng-zorro-antd/checkbox";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzTooltipDirective } from "ng-zorro-antd/tooltip";
import { AuthService } from "./shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [ReactiveFormsModule, NzInputGroupComponent, NzFormControlComponent, NzInputDirective, NzCheckboxComponent, NzRowDirective, NzColDirective, NzButtonComponent, NzFormDirective, NzIconDirective, NzTooltipDirective, FormsModule],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss"
})
export class AuthComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: NonNullableFormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      token: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    this.authService.signIn(this.form.getRawValue()).subscribe(
      () => {
        this.router.navigateByUrl("/");
      }
    );
  }
}
