import { Component } from '@angular/core';
import { AuthService } from '../../services/seguridad.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
selector: 'app-registro',
standalone: true,
  imports: [FormsModule,RouterModule],
templateUrl: './registro.component.html'
})
export class RegistroComponent {

registroData = {
username: '',
password: ''
}

constructor(
private authService: AuthService,
private router: Router
){}

registrar(){

this.authService.registro(this.registroData)
.subscribe((res:any)=>{

alert("Usuario creado correctamente")

this.router.navigate(['/'])

})

}

}
