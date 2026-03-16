import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnviosInterface } from '../interface/envios.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  API_URL:string = "https://prueba-tecnica-backend-u2pv.onrender.com/envios";

  constructor(private http:HttpClient) { }

  getEnvios():Observable<EnviosInterface[]>{
    return this.http.get<EnviosInterface[]>(this.API_URL);
  }

  crearEnvio(envio:any):Observable<any>{
    return this.http.post(this.API_URL,envio);
  }

  actualizarEnvio(id:string,envio:any):Observable<any>{
    return this.http.put(`${this.API_URL}/${id}`,envio);
  }

  eliminarEnvio(id:string):Observable<any>{
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
