import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    /** 
     * Essa abordagem não atualiza o componente se a rota mudar 
     */
    /*this.userName = this.activatedRoute.snapshot.params['userName'];
    this.photos = this.activatedRoute.snapshot.data['photos'];*/

    /** 
     * Consumindo uma subscrição da rota ativa, casa vez que a rota mudar
     * disparará a atribuição do "userName" e dos dados do "snapshot" 
     */
    this.activatedRoute.params.subscribe(
      (params) => {
        this.userName = params['userName'];
        this.photos = this.activatedRoute.snapshot.data['photos'];
      }
    );
  }

  ngOnDestroy(): void {}

  receive(event: any) {
    this.filter = event;
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if(!photos.length) this.hasMore = false;
      });
  }
}
