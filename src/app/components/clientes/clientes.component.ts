import { Component,OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import {  ClientesInterface } from '../../interface/clientes.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements OnInit {
    clientesList: ClientesInterface [] = [];

    cliente:ClientesInterface = {
    id:"",
    nombre:"",
    celular:"",
    correo:"",
    direccion:""
    };

    editando:boolean = false;
    mostrarFormulario:boolean = false;

    constructor(private clientesService:ClientesService,private router: Router){}

    ngOnInit(): void {
      this.getClientes()
    }

    getClientes(){
    this.clientesService.getClientes().subscribe({
      next:(result:any[])=>{
        this.clientesList = result.map(item => ({
          id: item._id,
          nombre: item.nombre,
          celular: item.celular,
          correo: item.correo,
          direccion: item.direccion
        }));
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  limpiarFormulario(){

    this.cliente = {
      id:"",
      nombre:"",
      celular:"",
      correo:"",
      direccion:""
    }

  }

  nuevoCliente(){

    this.limpiarFormulario();
    this.editando = false;
    this.mostrarFormulario = true;

  }

  crearCliente(){

      this.clientesService.createCliente(this.cliente).subscribe({
        next:()=>{
          this.getClientes();
          this.limpiarFormulario();
          this.mostrarFormulario = false;
        },
        error:(err)=>{
          console.log(err)
        }
      })

  }

  editarCliente(cliente: ClientesInterface){
    this.cliente = {
      id: cliente.id,
      nombre: cliente.nombre,
      celular: cliente.celular,
      correo: cliente.correo,
      direccion: cliente.direccion
    };

    this.editando = true;
    this.mostrarFormulario = true;
  }

  actualizarCliente(){

    this.clientesService.updateCliente(this.cliente.id,this.cliente)
    .subscribe({
      next:()=>{
        this.getClientes();
        this.limpiarFormulario();
        this.editando = false;
        this.mostrarFormulario = false;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  eliminarCliente(id:string){

    if(confirm("¿Eliminar cliente?")){

      this.clientesService.deleteCliente(id).subscribe({
        next:()=>{
          this.getClientes();
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }
  }

  volverHome(){
  this.router.navigate(['/']);
}


}
