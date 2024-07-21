import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Product } from "../product.model";

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

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.BASE_URL}/${id}`);
  }

  createProduct(product: Omit<Product, "id">): Observable<Product> {
    return this.httpClient.post<Product>(`${this.BASE_URL}`, product);
  }
}
