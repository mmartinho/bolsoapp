import { Component, Input, OnInit } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';

import {text} from "@cloudinary/url-gen/qualifiers/source";
import {Position} from "@cloudinary/url-gen/qualifiers/position";
import {TextStyle} from "@cloudinary/url-gen/qualifiers/textStyle";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";

import { environment } from '../../../environments/environment';
import { AlertService } from '../../shared/components/alert/alert.service';
import { Quemsou } from '../quemsou/quemsou';
import { QuemsouService } from '../quemsou/quemsou.service';

@Component({
  selector: 'ap-eusou',
  templateUrl: './eusou.component.html',
  styleUrls: ['./eusou.component.scss']
})
export class EusouComponent implements OnInit {

  @Input() url!: string;
  @Input() description!: string;

  nome: string = '';
  img!: CloudinaryImage;
  
  constructor(private quemsouService : QuemsouService, private alertService: AlertService) { }

  setImage(texto: string) {
    const cld = new Cloudinary({cloud: { cloudName: environment.cloudinaryName }});
    this.img = cld.image('eusoubolso_xwblrb');
    this.img.overlay(   
      source(
        text(texto, new TextStyle('arial',70))
        .textColor('white')      
      )
      .position(new Position().gravity(compass('north')).offsetY(280).offsetX(-180))
    ); 
  }

  ngOnInit(): void {
    this.quemsouService.getQuemsou().subscribe({
      next: (eu: Quemsou) => { 
        this.nome = eu.meunome;
        if(this.nome) {
          this.setImage(this.nome.toUpperCase());
        }        
      },
      error: (err : any) => {
        this.alertService.warning('Não foi possível pegar o seu nome', true);  
      }
    });
  }

}
