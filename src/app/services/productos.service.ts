import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductosInterface } from '../interface/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URL:string = "http://127.0.0.1:8000/productos";
  constructor(private httpClient: HttpClient) { }
   
  getProductos():Observable <ProductosInterface[]> {
    return this.httpClient.get<ProductosInterface[]>(this.API_URL);
  }

}
