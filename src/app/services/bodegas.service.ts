import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BodegasInterface } from '../interface/bodegas.interface';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {

    API_URL:string = "http://127.0.0.1:8000/bodegas";
    constructor(private httpClient: HttpClient) { }
     
    getBodegas():Observable <BodegasInterface[]> {
      return this.httpClient.get<BodegasInterface[]>(this.API_URL);
    }
}
