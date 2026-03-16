import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientesInterface } from '../interface/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  API_URL:string = "http://127.0.0.1:8000/clientes";
  constructor(private httpClient: HttpClient) { }
   
  getClientes():Observable <ClientesInterface[]> {
    return this.httpClient.get<ClientesInterface[]>(this.API_URL);
  }

  createCliente(cliente:ClientesInterface):Observable<ClientesInterface>{
    return this.httpClient.post<ClientesInterface>(this.API_URL,cliente);
  }

  updateCliente(id:string,cliente:ClientesInterface):Observable<ClientesInterface>{
    return this.httpClient.put<ClientesInterface>(`${this.API_URL}/${id}`,cliente);
  }

  deleteCliente(id:string):Observable<any>{
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
