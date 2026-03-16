import { CommonModule } from '@angular/common';
import { Component,OnInit,  } from '@angular/core';
import { BodegasInterface } from '../../interface/bodegas.interface';
import { BodegasService } from '../../services/bodegas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bodegas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.css'
})
export class BodegasComponent implements OnInit {
  bodegasList: BodegasInterface [] = [];

  bodega:BodegasInterface = {
      id:"",
      nombre:"",
      ciudad:"",
      pais:""
      };
  
   editando:boolean = false;
   mostrarFormulario:boolean = false
  
  constructor(private bodegasService:BodegasService){}
    
  ngOnInit(): void {
    this.getBodegas()
  }

  getBodegas(){
  this.bodegasService.getBodegas().subscribe({
    next:(result:any[])=>{
      this.bodegasList = result.map(item => ({
        id: item._id,
        nombre: item.nombre,
        ciudad: item.ciudad,
        pais: item.pais
      }));
    },
    error:(err:any)=>{
      console.log(err)
    }
  })
}

 limpiarFormulario(){

    this.bodega = {
      id:"",
      nombre:"",
      ciudad:"",
      pais:""
    }

  }

  nuevaBodega(){

    this.limpiarFormulario();
    this.editando = false;
    this.mostrarFormulario = true;

  }

  crearBodega(){

      this.bodegasService.createBodega(this.bodega).subscribe({
        next:()=>{
          this.getBodegas();
          this.limpiarFormulario();
          this.mostrarFormulario = false;
        },
        error:(err)=>{
          console.log(err)
        }
      })

  }

  editarBodega(bodega: BodegasInterface){
      this.bodega = {
        id: bodega.id,
        nombre: bodega.nombre,
        ciudad: bodega.ciudad,
        pais: bodega.pais
      };
  
      this.editando = true;
      this.mostrarFormulario = true;
  }

  actualizarBodega(){

    this.bodegasService.updateBodega(this.bodega.id,this.bodega)
    .subscribe({
      next:()=>{
        this.getBodegas();
        this.limpiarFormulario();
        this.editando = false;
        this.mostrarFormulario = false;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  eliminarBodega(id:string){

    if(confirm("¿Eliminar bodega?")){

      this.bodegasService.deleteBodega(id).subscribe({
        next:()=>{
          this.getBodegas();
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }
  }

}
