import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { faComment, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'ap-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {

  photoObservable! : Observable<Photo>;
  photoId : number = 0;

  /** F Awesome */
  faComment = faComment;
  faTrash = faTrash;
  faHeart = faHeart;

  constructor(
    private route: ActivatedRoute, 
    private photoService : PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params['photoId'];
    this.photoObservable = this.photoService.findById(this.photoId);
    /**
     * Já faz uma subscrição logo de cara pra verificar se a foto
     * existe mesmo, e, caso não exista, redireciona para 
     * página/componente de "not-found"
     */
    this.photoObservable.subscribe(
      {
        next: ()=>{},
        error: (error) => {this.router.navigate(['not-found']);}
      }
    )
  }

  remove(): void {
    this.photoService.removePhoto(this.photoId).subscribe(
      {
        next: () => {
          this.alertService.success('Photo removed', true);
          this.router.navigate(['/user', this.userService.getUserName()]);
        },
        error: (err) => {
          this.alertService.warning('Could not remove photo. '+err.message);
        }
      } 
    );
  }

  like(photo: Photo) {
    this.photoService.like(photo.id).subscribe({
      next: (liked) => {
        if(liked) {
          this.photoObservable = this.photoService.findById(photo.id);
        }  
      },
      error : (err) => {
        this.alertService.warning('Could not like photo. '+err.message);
      }
    });
  }

}
