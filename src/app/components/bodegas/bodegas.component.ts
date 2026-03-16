import { CommonModule } from '@angular/common';
import { Component,OnInit,ChangeDetectorRef  } from '@angular/core';
import { BodegasInterface } from '../../interface/bodegas.interface';
import { BodegasService } from '../../services/bodegas.service';

@Component({
  selector: 'app-bodegas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.css'
})
export class BodegasComponent implements OnInit {
  bodegasList: BodegasInterface [] = [];
        constructor(private bodegasService:BodegasService,
          private cd: ChangeDetectorRef){}
    
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
      this.cd.detectChanges();
    },
    error:(err:any)=>{
      console.log(err)
    }
  })

}

}
