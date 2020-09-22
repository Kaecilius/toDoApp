import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  //listas:Lista[] = [];

  @Input() terminada = true;

  constructor(  public deseosServices:DeseosService,
                private router:Router,
                private alertCtrl:AlertController
              ) {
                }

  ngOnInit() {}
  
  listaSeleccionada( lista:Lista ){
    const listaId = lista.id;
    if( this.terminada ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ listaId }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
    }
  }              

  borrarLista( lista:Lista ){

    this.deseosServices.borrarLista( lista );

  }

  async editarLista( lista:Lista ){

    const alert =  await this.alertCtrl.create({
      cssClass: 'my-custom-class',
     inputs:[
       {
         name:'titulo',
         type:'text',
         placeholder:'Nombre de la lista',
         value: lista.titulo
       }
     ],
      message: 'Editar Lista',
      buttons: [{
        text:'Cancelar',
        role:'cancel',
        handler: () =>{
          console.log('Cancelar')
        },
      },{
        text:'Aceptar',
        handler:( data)=>{
          console.log(data);
          if( data.titulo.length === 0){
            return;
          }
          //editar la lista:
          console.log(data);
          this.deseosServices.editarLista(lista, data );
          //const nombreLista = this.deseosServices.crearLista( data.titulo );
          //this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
        }
      }
    ]
    });

    alert.present();

  }


}
