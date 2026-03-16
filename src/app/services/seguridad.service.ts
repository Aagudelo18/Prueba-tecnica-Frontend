import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})

export class AuthService {

API_URL:string = "https://prueba-tecnica-backend-u2pv.onrender.com";

constructor(private http: HttpClient, private router: Router) {}

login(data:any){
return this.http.post(this.API_URL + "/login", data)
}

registro(data:any){
return this.http.post(this.API_URL + "/registro", data)
}

guardarToken(token:string){

if (typeof window !== 'undefined') {
  localStorage.setItem("token", token)
}

}

obtenerToken(){

if (typeof window !== 'undefined') {
  return localStorage.getItem("token")
}

return null

}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

estaLogueado(){

if (typeof window !== 'undefined') {
  return !!localStorage.getItem("token")
}

return false

}

}