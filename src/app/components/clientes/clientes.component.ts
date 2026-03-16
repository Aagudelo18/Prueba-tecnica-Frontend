import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import {  ClientesInterface } from '../../interface/clientes.interface';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements OnInit {
    clientesList: ClientesInterface [] = [];
    constructor(private clientesService:ClientesService,
      private cd: ChangeDetectorRef){}

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
      this.cd.detectChanges();
    },
    error:(err:any)=>{
      console.log(err)
    }
  })

}
}
