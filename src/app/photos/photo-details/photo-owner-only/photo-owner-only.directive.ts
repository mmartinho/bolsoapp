import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { UserService } from '../../../core/user/user.service';

import { Photo } from '../../photo/photo';

@Directive({
  selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

  @Input()
  ownedPhoto!: Photo;

  constructor(
    private element: ElementRef<any>, 
    private renderer: Renderer2,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      if(!user || user.id != this.ownedPhoto.userId) {
        console.log(user.name + ' não é dono deste perfil');
        this.renderer.setAttribute(this.element.nativeElement, 'style', 'display: none');
      }
    });
  }

}
