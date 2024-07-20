import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../product/product.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private BASE_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.BASE_URL);
  }
}
