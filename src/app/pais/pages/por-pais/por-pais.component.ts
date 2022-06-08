import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li{
    cursor:pointer;
  }
  `

  ]
})
export class PorPaisComponent {
  
  public termino:string = '';
  hayError: boolean = false;
  paises : Country[]=[];
  paisesSugeridos : Country[]=[];
  mostrarSugerencias: boolean = false;



  constructor(private paisService: PaisService) { }

  
  buscar(termino: string){
    this.hayError= false;
    this.termino= termino;
    
    this.paisService.buscarPais(termino)
    .subscribe({
      next: (paises) => {
        this.paises=paises,
        console.log(paises)}
      ,error: (err) => {
        this.hayError = true,
        this.paises=[]
      }
    });
  }

  sugerencias(termino:string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias=true;
    this.paisService.buscarPais(termino)
      .subscribe({next: (paises)=>{ this.paisesSugeridos=paises.splice(0,3)}
                  ,error:(err)=>this.paisesSugeridos=[]}
      );
  }


  buscarSugerido(termino:string){
    this.mostrarSugerencias=false;
    this.buscar(termino);

  }
}
