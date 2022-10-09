import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../core/user/user.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  faImage = faImage;
  
  photoForm!: FormGroup;
  file!: File;
  preview: string='';
  percentDone: number = 0;

  constructor(
    private formBuilder : FormBuilder, 
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService, 
    private userService: UserService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: [
        '',
        Validators.required
      ],
      description: [
        '',
        Validators.maxLength(300)
      ],
      allowComments: [
        true
      ]
    });
  }

  change(event: Event | null) {
    if(event != null) {
      if(event.target != null){
        const target = event.target as HTMLInputElement;
        if(target.files != null) {
          const reader = new FileReader();
          this.file = target.files[0]; 
          reader.onload = (event: any) => { this.preview = event.target?.result; }
          reader.readAsDataURL(this.file);
        }
      }
    }
  }

  upload() {
    const description = this.photoForm.get('description')?.value;
    const allowComments = this.photoForm.get('allowComments')?.value;
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(
        {
          next: (event: HttpEvent<any>) => {
            if(event.type == HttpEventType.UploadProgress) {
              if(event.total) {
                this.percentDone = Math.round(100 * event.loaded / event.total);
              }
            } else if(event.type == HttpEventType.Response) {
              this.alertService.success('Upload complete', true);
            }
          },
          error: (err) => {
            this.alertService.warning('Upload failure. '+err.message, true);
          },
          complete : () => {
            this.router.navigate(['/user', this.userService.getUserName()]);
          }
        }          
      ); 
  }

}
