import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.scss']
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId: number = 0;
  commentsObervable! : Observable<PhotoComment[]>;
  commentForm!: FormGroup;
  
  constructor(
    private photoService : PhotoService,
    private formBuilder: FormBuilder    
  ) { }

  ngOnInit(): void {
    this.commentsObervable = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  save() {
    const commentText = this.commentForm.get('comment')?.value as string;
    /** Atualiza o observable de comentários... */
    this.commentsObervable = this.photoService
      .addComments(this.photoId, commentText)
      /** ...trocando de observable addComments para getComments */
      .pipe(switchMap(()=>{ return this.photoService.getComments(this.photoId); }))
      /** ...antes de retornar o observable, executa o reset do formulário */
      .pipe(tap( () => {
          this.commentForm.reset();
          console.log('Comentário adicionado com sucesso');
        }
      ));
  }

}
