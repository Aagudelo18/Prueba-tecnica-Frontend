import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EnviosService } from '../../services/envios.service';
import { ClientesService } from '../../services/clientes.service';
import { ProductosService } from '../../services/productos.service';
import { BodegasService } from '../../services/bodegas.service';
import { PuertosService } from '../../services/puertos.service';

import { EnviosInterface } from '../../interface/envios.interface';
import { ClientesInterface } from '../../interface/clientes.interface';
import { ProductosInterface } from '../../interface/productos.interface';
import { BodegasInterface } from '../../interface/bodegas.interface';
import { PuertosInterface } from '../../interface/puertos.interface';

import { Router } from '@angular/router';



@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envios.component.html',
  styleUrl: './envios.component.css'
})
export class EnviosComponent implements OnInit {

  enviosList: EnviosInterface[] = [];

  clientesList: ClientesInterface[] = [];
  productosList: ProductosInterface[] = [];
  bodegasList:BodegasInterface[] = [];
  puertosList:PuertosInterface[] = [];

  envio: EnviosInterface = {
    _id:"",
    numero_guia:"",
    cliente_id:"",
    producto_id:"",
    cantidad_producto:0,
    precio_envio:0,
    fecha_registro:new Date(),
    fecha_entrega:new Date(),
    tipo_envio:"",
    logistica:{}
  };

  editando:boolean = false;
  mostrarFormulario:boolean = false;

  constructor(
    private enviosService:EnviosService,
    private clientesService:ClientesService,
    private productosService:ProductosService,
    private bodegasService:BodegasService,
    private puertosService:PuertosService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.getEnvios();
    this.getClientes();
    this.getProductos();
    this.getBodegas();
    this.getPuertos();

  }

  getEnvios(){

    this.enviosService.getEnvios().subscribe({

      next:(result:any[])=>{

        this.enviosList = result.map(item => ({

          _id:item._id,
          numero_guia:item.numero_guia,
          cliente_id:item.cliente_id,
          producto_id:item.producto_id,
          cantidad_producto:item.cantidad_producto,
          precio_envio:item.precio_envio,
          fecha_registro:item.fecha_registro,
          fecha_entrega:item.fecha_entrega,
          tipo_envio:item.tipo_envio,
          logistica:item.logistica

        }));

      },
      error:(err)=>{ console.log(err) }

    });

  }

  getClientes(){

    this.clientesService.getClientes().subscribe({

      next:(result:any[])=>{

        this.clientesList = result.map(item => ({
          id:item._id,
          nombre:item.nombre,
          celular: item.celular,
          correo: item.correo,
          direccion: item.direccion

        }));

      },
      error:(err)=>{console.log(err)}

    });

  }

  getProductos(){

    this.productosService.getProductos().subscribe({

      next:(result:any[])=>{

        this.productosList = result.map(item => ({
          id:item._id,
          nombre:item.nombre,
          descripcion:item.descripcion
        }));

      },
      error:(err)=>{console.log(err)}

    });

  }
  getBodegas(){

  this.bodegasService.getBodegas().subscribe({

    next:(result:any[])=>{

      this.bodegasList = result.map(item => ({
        id:item._id,
        nombre:item.nombre,
        ciudad: item.ciudad,
        pais: item.pais
      }));

    },

    error:(err)=>{console.log(err)}

  })

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

    this.envio = {

      _id:"",
      numero_guia:"",
      cliente_id:"",
      producto_id:"",
      cantidad_producto:0,
      precio_envio:0,
      fecha_registro:new Date(),
      fecha_entrega:new Date(),
      tipo_envio:"",
      logistica:{}

    }

  }

  nuevoEnvio(){

    this.limpiarFormulario();
    this.editando = false;
    this.mostrarFormulario = true;

  }

  crearEnvio(){

  let envioData:any = {

    numero_guia: this.envio.numero_guia,
    cliente_id: this.envio.cliente_id,
    producto_id: this.envio.producto_id,

    cantidad_producto: this.envio.cantidad_producto,
    precio_envio: this.envio.precio_envio,

    fecha_registro: this.envio.fecha_registro,
    fecha_entrega: this.envio.fecha_entrega,

    tipo_envio: this.envio.tipo_envio,

    logistica:{}

  }
  console.log(envioData)

  if(this.envio.tipo_envio == "terrestre"){

    envioData.logistica = {
      placa_vehiculo: this.envio.logistica.placa_vehiculo,
      bodega_id: this.envio.logistica.bodega_id
    }

  }

  if(this.envio.tipo_envio == "maritimo"){

    envioData.logistica = {
      numero_flota: this.envio.logistica.numero_flota,
      puerto_id: this.envio.logistica.puerto_id
    }

  }

  this.enviosService.crearEnvio(envioData).subscribe({

    next:()=>{
      this.getEnvios()
      this.limpiarFormulario()
      this.mostrarFormulario=false
    },

    error:(err)=>{
      console.log(err)
    }

  })

}

  editarEnvio(envio:EnviosInterface){

    this.envio = {...envio};

    this.editando = true;
    this.mostrarFormulario = true;

  }

  actualizarEnvio(){

    this.enviosService.actualizarEnvio(this.envio._id!,this.envio)
    .subscribe({

      next:()=>{

        this.getEnvios();
        this.limpiarFormulario();
        this.editando = false;
        this.mostrarFormulario = false;

      },

      error:(err)=>{console.log(err)}

    });

  }

  eliminarEnvio(id:string){

    if(confirm("¿Eliminar envio?")){

      this.enviosService.eliminarEnvio(id).subscribe({

        next:()=>{ this.getEnvios(); },
        error:(err)=>{console.log(err)}

      });

    }

  }

  obtenerNombreCliente(id: string): string {

  const cliente = this.clientesList.find(c => c.id === id);

  return cliente ? cliente.nombre : id;

 }

 obtenerNombreProducto(id: string): string {

  const producto = this.productosList.find(p => p.id === id);

  return producto ? producto.nombre : id;

}

obtenerNombreBodega(id: string): string {

  const bodega = this.bodegasList.find(b => b.id === id);

  return bodega ? bodega.nombre : id;

}

obtenerNombrePuerto(id: string): string {

  const puerto = this.puertosList.find(p => p.id === id);

  return puerto ? puerto.nombre : id;

}

obtenerLogistica(envio:any): string {

  if(envio.tipo_envio === "terrestre"){

    const nombreBodega = this.obtenerNombreBodega(envio.logistica.bodega_id)

    return envio.logistica.placa_vehiculo + " - " + nombreBodega
  }

  if(envio.tipo_envio === "maritimo"){

    const nombrePuerto = this.obtenerNombrePuerto(envio.logistica.puerto_id)

    return envio.logistica.numero_flota + " - " + nombrePuerto
  }

  return ""
}

volverHome(){
  this.router.navigate(['/']);
}

}