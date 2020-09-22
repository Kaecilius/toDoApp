import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.models';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreitem:string = '';

  constructor( private deseosService: DeseosService,
                private route:ActivatedRoute ) {

        const listaId = this.route.snapshot.paramMap.get('listaid');
        
        this.lista = this.deseosService.obtenerLista( listaId );
        

  }

  ngOnInit() {
  }


  agregarItem() {
    if( this.nombreitem.length === 0){
      return;
    }
    console.log(this.nombreitem);
    console.log(this.lista);
    const nuevoIten = new ListaItem( this.nombreitem );

    this.lista.item.push( nuevoIten );
    this.nombreitem = '';
    this.deseosService.guardarStorage();

  }
  cambioCheck(item:ListaItem){
    const pendientes = this.lista.item
                            .filter( itemData =>!itemData.completado)
                            .length;
    
    if( pendientes === 0){

      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;

    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;

    }

    this.deseosService.guardarStorage();

  }

  borrar( i:number ){

    this.lista.item.splice( i,1 );
    this.deseosService.guardarStorage();
  }

}
