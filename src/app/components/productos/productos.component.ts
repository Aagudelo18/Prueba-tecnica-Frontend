import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { ProductosInterface } from '../../interface/productos.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productosList: ProductosInterface [] = [];

  producto:ProductosInterface = {
      id:"",
      nombre:"",
      descripcion:""
      };
  
      editando:boolean = false;
      mostrarFormulario:boolean = false;

  constructor(private productosService:ProductosService){}

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos(){
  this.productosService.getProductos().subscribe({
    next:(result:any[])=>{
      this.productosList = result.map(item => ({
        id: item._id,
        nombre: item.nombre,
        descripcion: item.descripcion
      }));
    },
    error:(err:any)=>{
      console.log(err)
    }
  })
}
  limpiarFormulario(){

    this.producto = {
      id:"",
      nombre:"",
      descripcion:""
    }

  }

  nuevoProducto(){

    this.limpiarFormulario();
    this.editando = false;
    this.mostrarFormulario = true;

  }

  crearProducto(){

      this.productosService.createProducto(this.producto).subscribe({
        next:()=>{
          this.getProductos();
          this.limpiarFormulario();
          this.mostrarFormulario = false;
        },
        error:(err)=>{
          console.log(err)
        }
      })

  }

  editarProducto(producto: ProductosInterface){
      this.producto = {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion
      };
  
      this.editando = true;
      this.mostrarFormulario = true;
  }

  actualizarProducto(){

    this.productosService.updateProducto(this.producto.id,this.producto)
    .subscribe({
      next:()=>{
        this.getProductos();
        this.limpiarFormulario();
        this.editando = false;
        this.mostrarFormulario = false;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  eliminarProducto(id:string){

    if(confirm("¿Eliminar producto?")){

      this.productosService.deleteProducto(id).subscribe({
        next:()=>{
          this.getProductos();
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }
  }

}
