import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { QuemsouService } from './quemsou.service';

@Component({
  selector: 'ap-quemsou',
  templateUrl: './quemsou.component.html',
  styleUrls: ['./quemsou.component.scss']
})
export class QuemsouComponent implements OnInit {
  quemsouForm!: FormGroup;
  preview: string='';

  constructor(
    private formBuilder : FormBuilder, 
    private router: Router, 
    private quemsouService : QuemsouService   
  ) { }

  ngOnInit(): void {
    this.quemsouForm = this.formBuilder.group(
      {
        meunome: ['', Validators.required]
      }
    );    
  }

  ok() {
    if(this.quemsouForm.valid && !this.quemsouForm.pending) {
      this.quemsouService.setQuemsou({ meunome: this.quemsouForm.get('meunome')?.value });
      this.router.navigate(['/bolsonaro/eusou']);
    }
  }  
}
