import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PuertosInterface } from '../interface/puertos.interface';

@Injectable({
  providedIn: 'root'
})
export class PuertosService {

  API_URL:string = "http://127.0.0.1:8000/puertos";
  constructor(private httpClient: HttpClient) { }
     
  getPuertos():Observable <PuertosInterface[]> {
    return this.httpClient.get<PuertosInterface[]>(this.API_URL);
  }

  createPuerto(puerto:PuertosInterface):Observable<PuertosInterface>{
      return this.httpClient.post<PuertosInterface>(this.API_URL,puerto);
    }
  
  updatePuerto(id:string,puerto:PuertosInterface):Observable<PuertosInterface>{
      return this.httpClient.put<PuertosInterface>(`${this.API_URL}/${id}`,puerto);
    }
  
  deletePuerto(id:string):Observable<any>{
      return this.httpClient.delete(`${this.API_URL}/${id}`);
    }
}
