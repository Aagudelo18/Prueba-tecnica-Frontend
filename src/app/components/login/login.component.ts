import { Component } from '@angular/core';
import { AuthService } from '../../services/seguridad.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-login',
standalone: true,
imports: [RouterModule, FormsModule],
templateUrl: './login.component.html'
})
export class LoginComponent {

loginData = {
username: '',
password: ''
}

constructor(
private authService: AuthService,
private router: Router
){}

login(){

this.authService.login(this.loginData)
.subscribe((res:any)=>{

this.authService.guardarToken(res.access_token)

this.router.navigate(['/home'])

})

}

}
