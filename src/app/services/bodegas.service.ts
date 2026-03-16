import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BodegasInterface } from '../interface/bodegas.interface';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {

  API_URL:string = "https://prueba-tecnica-backend-u2pv.onrender.com/bodegas";
    constructor(private httpClient: HttpClient) { }
     
  getBodegas():Observable <BodegasInterface[]> {
      return this.httpClient.get<BodegasInterface[]>(this.API_URL);
  }

  createBodega(bodega:BodegasInterface):Observable<BodegasInterface>{
        return this.httpClient.post<BodegasInterface>(this.API_URL,bodega);
  }
    
  updateBodega(id:string,bodega:BodegasInterface):Observable<BodegasInterface>{
        return this.httpClient.put<BodegasInterface>(`${this.API_URL}/${id}`,bodega);
  }
    
  deleteBodega(id:string):Observable<any>{
        return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
