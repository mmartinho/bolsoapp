import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm! : FormGroup;
  /**
   * Ao invés de usar o construtor para injetar a dependência, 
   * estamos usando o injeção via "decorator" ViewChild
   */
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private platformDetectorService : PlatformDetectorService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });   
    this.mainFocus();
  }  

  /** 
   * Mantém o foco no campo do nome do usuário 
   */
  private mainFocus() {
    if(this.platformDetectorService.isPlatformBrowser()) {
      this.changeDetectorRef.detectChanges(); // força o evento para o @ViewChild não ficar nulo
      this.userNameInput.nativeElement.focus();
    } 
  }    

  login() {
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    if(userName && password) {
      /** 
       * Nova forma de fazer o subscribre é passando um JSON 
       * com as propriedades next, error, complete 
       */
      this.auth.authenticate(userName, password).subscribe({
          next: (user) => {
            this.router.navigate(['user', userName]);
          },
          error: (err) => {
            alert('Invalid user name or password');
            this.loginForm.reset();
            this.mainFocus();
          }
      });
    }
  }
}
