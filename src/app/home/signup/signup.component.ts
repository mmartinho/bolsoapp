import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { LowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { userNamePassword } from './username-password-validator';

@Component({
  selector: 'ap-signup',
  templateUrl: './signup.component.html',
  providers: [ UserNotTakenValidatorService ],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService, 
    private router: Router,
    private platformDetectorService : PlatformDetectorService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  /** 
   * Mantém o foco no campo do email 
   */
   private mainFocus() {
    if(this.platformDetectorService.isPlatformBrowser()) {
      this.changeDetectorRef.detectChanges(); // força o evento para o @ViewChild não ficar nulo
      this.emailInput.nativeElement.focus();
    } 
  } 

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required, 
            Validators.email
          ]
        ],
        userName: [
          /** Valor padrão */
          '', 
          /** Validadores síncronos */
          [ 
            Validators.required, 
            Validators.minLength(2), 
            Validators.maxLength(30),
            LowerCaseValidator.lowercase,
          ],  
          /** Validadores assíncronos */
          [
            this.userNotTakenValidatorService.checkUserNameTaken()
          ]  
        ],
        fullName: [
          '', 
          [
            Validators.required, 
            Validators.minLength(2), 
            Validators.maxLength(40)
          ]
        ],
        password: [
          '', 
          [
            Validators.required, 
            Validators.minLength(8), 
            Validators.maxLength(14)
          ]
        ]
      },
      /** Cross-field validation rule */ 
      {
        validators : userNamePassword
      }
    );
    this.mainFocus();
  }

  signup() {
    /**
     * Ao invés de usar a diretiva no botão de submissão do formulário 
     * no template, utilizamos aqui
     * @see alurapic\src\app\home\signup\signup.component.html
     */
    if(this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signupService
        .signup(newUser)
        .subscribe({
            next: () => {
              this.router.navigate(['user', 'login']);
            },
            error: (err) => {
              alert('Signup failure. '+err.message);
              this.mainFocus();
            }
          }
        );
    }
  }

}
