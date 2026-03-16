import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { ProductosInterface } from '../../interface/productos.interface';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productosList: ProductosInterface [] = [];
  constructor(private productosService:ProductosService,
  private cd: ChangeDetectorRef){}

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
      this.cd.detectChanges();
    },
    error:(err:any)=>{
      console.log(err)
    }
  })

}

}
