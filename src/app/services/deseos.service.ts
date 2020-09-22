import { Injectable } from '@angular/core';
import { strict } from 'assert';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {


  listas:Lista[] = [];

  constructor() { 
      this.cargarStorage();
  }

  getListas(){
    console.log(this.listas);
    return this.listas;
  }

  crearLista( titulo:string ){

    const nuevalista = new Lista(titulo);
    this.listas.push(nuevalista);
    this.guardarStorage();

    return nuevalista.id;
  }

  obtenerLista( id:string | number ){
    id = Number(id);
    return this.listas.find( listaData =>  listaData.id === id);
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify( this.listas ) )
  }

  cargarStorage(){

    if(localStorage.getItem('data') ){

      this.listas = JSON.parse( localStorage.getItem('data') );

    }else{

      this.listas = [];

    }
  }

  estadoListas( estado:boolean){

     return this.listas.filter(lista => lista.terminada === estado );

  }

  borrarLista( lista:Lista ){

    this.listas = this.listas.filter( listaData => listaData.id !== lista.id);
    
    this.guardarStorage();
  }

  editarLista( lista:Lista , nuevotitulo:string ){


    const listaid = lista.id;

    for (let lista of this.listas){

        if(lista.id === listaid){

          lista.titulo = nuevotitulo['titulo'];
         
        }

    }

    this.guardarStorage();
    
  }

  
}
