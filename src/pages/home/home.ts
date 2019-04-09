import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ANIMALES } from "../../data/data.animales"
import { Animal } from '../../interfaces/animal.interface';

import { Refresher, reorderArray} from "ionic-angular";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales: Animal[]=[];
  audio = new Audio();
  audioTiempo: any;
  ordenando = false;

  constructor() {

    this.animales = ANIMALES.slice(0);


  }
  reproducir( animal: Animal ){

    this.pausa_audio( animal );

    if (animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    console.log( animal );

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout( ()=> animal.reproduciendo = false, animal.duracion * 1000 );

  }
  private pausa_audio( animalSel:Animal ){

    clearTimeout( this.audioTiempo );

    this.audio.pause();
    this.audio.currentTime = 0;

    for( let animal of this.animales ){

      if( animal.nombre != animalSel.nombre ){
        animal.reproduciendo = false;
      }
    }

  }

  borrar_animal( idx:number ){

    this.animales.splice ( idx, 1 );
  }

  recargar_animales( refresher:Refresher){

    console.log("inicio del refresh");

    setTimeout( ()=>{

      console.log("tremino el refresh");
      this.animales = ANIMALES.slice(0);

      refresher.complete();

    },1500)

  }

  reordenar_animales( indeces:any){

    console.log(indeces);
    this.animales = reorderArray( this.animales, indeces);
  }

}
