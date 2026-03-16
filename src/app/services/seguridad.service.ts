import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})

export class AuthService {

API_URL:string = "http://127.0.0.1:8000";

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