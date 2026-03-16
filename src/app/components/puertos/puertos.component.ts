import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuertosService } from '../../services/puertos.service';
import { PuertosInterface } from '../../interface/puertos.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-puertos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './puertos.component.html',
  styleUrl: './puertos.component.css'
})
export class PuertosComponent implements OnInit {
  puertosList: PuertosInterface [] = [];

  puerto:PuertosInterface = {
      id:"",
      nombre:"",
      ciudad:"",
      pais:""
      };
  
      editando:boolean = false;
      mostrarFormulario:boolean = false;
  

  constructor(private puertosService:PuertosService){}
  
  ngOnInit(): void {
    this.getPuertos()
  }
  
  getPuertos(){
    this.puertosService.getPuertos().subscribe({
      next:(result:any[])=>{
        this.puertosList = result.map(item => ({
          id: item._id,
          nombre: item.nombre,
          ciudad: item.ciudad,
          pais:item.pais
        }));
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  limpiarFormulario(){

    this.puerto = {
      id:"",
      nombre:"",
      ciudad:"",
      pais:""
    }

  }

  nuevoPuerto(){

    this.limpiarFormulario();
    this.editando = false;
    this.mostrarFormulario = true;

  }

  crearPuerto(){

      this.puertosService.createPuerto(this.puerto).subscribe({
        next:()=>{
          this.getPuertos();
          this.limpiarFormulario();
          this.mostrarFormulario = false;
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  editarPuerto(puerto: PuertosInterface){
      this.puerto = {
        id: puerto.id,
        nombre: puerto.nombre,
        ciudad: puerto.ciudad,
        pais: puerto.pais
      };
  
      this.editando = true;
      this.mostrarFormulario = true;
  }

  actualizarPuerto(){

    this.puertosService.updatePuerto(this.puerto.id,this.puerto)
    .subscribe({
      next:()=>{
        this.getPuertos();
        this.limpiarFormulario();
        this.editando = false;
        this.mostrarFormulario = false;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  eliminarPuerto(id:string){

    if(confirm("¿Eliminar puerto?")){

      this.puertosService.deletePuerto(id).subscribe({
        next:()=>{
          this.getPuertos();
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }
  }
}
