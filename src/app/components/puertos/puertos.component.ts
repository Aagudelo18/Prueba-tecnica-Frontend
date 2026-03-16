import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuertosService } from '../../services/puertos.service';
import { PuertosInterface } from '../../interface/puertos.interface';

@Component({
  selector: 'app-puertos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puertos.component.html',
  styleUrl: './puertos.component.css'
})
export class PuertosComponent implements OnInit {
  puertosList: PuertosInterface [] = [];
  constructor(private puertosService:PuertosService,
  private cd: ChangeDetectorRef){}
  
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
        this.cd.detectChanges();
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  
  }

}
