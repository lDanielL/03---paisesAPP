import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
    ) { }

  ngOnInit(): void {

    this.activateRoute.params
    .pipe(
      switchMap(({id})=> this.paisService.getPaisPorAlpha(id)),
      tap( (pais)=>{
        this.pais=pais
        console.log(pais);
      } )
    
    )
    .subscribe({
            next:(pais)=>{
              
            },
            error:((err)=>{
              console.log('no existeeee');
            })
          });


    // this.activateRoute.params.subscribe({
    //   next:({id})=>{
    //     console.log(id);
    //     this.paisService.getPaisPorAlpha(id)
    //     .subscribe({
    //       next:(pais)=>{
    //         console.log(pais);
    //       }
    //     });
    //   }
    // })
  }

}
