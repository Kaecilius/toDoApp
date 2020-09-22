import { ListaItem } from './lista-item.models';



export class Lista {

    id: number;
    titulo: string;
    creadaEn:  Date;
    terminadaEn: Date;
    terminada: boolean;
    item: ListaItem[];

    constructor( titulo:string ){
        
        this.titulo = titulo;
        this.creadaEn = new Date();
        


        this.terminada = false;
        this.item = [];
        this.id = new Date().getTime();

    }

}