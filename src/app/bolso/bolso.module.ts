import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CloudinaryModule } from '@cloudinary/ng';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { EusouComponent } from './eusou/eusou.component';
import { QuemsouComponent } from './quemsou/quemsou.component';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';

@NgModule({
  declarations: [
    EusouComponent,
    QuemsouComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    VmessageModule,
    CloudinaryModule,
    ShareButtonsModule,
    ShareIconsModule,
  ]
})
export class BolsoModule { }
