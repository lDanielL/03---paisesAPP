import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
  button{
    margin-right:7px;
  }
  `
  ]
})
export class PorRegionComponent  {

  regiones: string[] = [  'africa', 'americas', 'asia', 'europe', 'oceania'];


  regionActiva: string ='';
  public termino:string = '';
  hayError: boolean = false;
  region : Country[]=[];

  constructor(private paisService : PaisService) { }

  getClaseCSS(region:string):string{

    return (region === this.regionActiva) ? 'btn-primary':'btn-outline-primary';
  }


    
  buscar(termino: string){

    if (this.regionActiva === termino) return;

    this.regionActiva = termino;
    this.region=[];

    this.paisService.buscarRegion(termino)
    .subscribe({
      next: (region) => {
        this.region= region;
        console.log(region)}
      ,error: (err) => {
        this.hayError = true,
        this.region=[]
      }
    });
  }
}
