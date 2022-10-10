import { Component, OnInit } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { Router } from '@angular/router';
import { responsive } from "@cloudinary/ng";

import { text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";

import { environment } from '../../../environments/environment';
import { AlertService } from '../../shared/components/alert/alert.service';
import { Quemsou } from '../quemsou/quemsou';
import { QuemsouService } from '../quemsou/quemsou.service';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'ap-eusou',
  templateUrl: './eusou.component.html',
  styleUrls: ['./eusou.component.scss']
})
export class EusouComponent implements OnInit {

  nome: string = '';
  img: CloudinaryImage | null = null;
  imgSrc : string = '';
  responsive = [responsive({steps: [25, 50, 100, 200, 300, 400, 500, 600, 700]})];
  
  constructor(
    private quemsouService : QuemsouService, 
    private alertService: AlertService, 
    private router: Router, 
    private localStorage : LocalStorageService
  ) { }

  setImage(texto: string) {
    try {
      const cld = new Cloudinary({cloud: { cloudName: environment.cloudinaryName }});
      this.img = cld.image('eusoubolso_xwblrb');
      this.img.overlay(   
        source(
          text(texto, new TextStyle('arial',70))
          .textColor('white')      
        )
        .position(new Position().gravity(compass('north')).offsetY(280).offsetX(-180))
      ); 
      
      this.imgSrc = this.img.toURL();      
    } catch (error) {
      this.img = null;
      this.imgSrc = 'assets/img/eusoubolso.jpg';
    }
  }

  myName(name : string | null | undefined): string {
    if(name) {
      this.localStorage.set('myName', name);
      return name;
    } else {
      const value = this.localStorage.get('myName');
      return value ? value : '' ;
    }
  }

  ngOnInit(): void {
    this.quemsouService.getQuemsou().subscribe({
      next: (eu: Quemsou) => { 
        this.nome = this.myName(eu.meunome);
        if(this.nome) {
          this.setImage(this.nome.toUpperCase());
        } else {
          this.router.navigate(['']);
        }      
      },
      error: (err : any) => {
        this.alertService.warning('Não foi possível pegar o seu nome', true);  
      }
    });
  }

}
