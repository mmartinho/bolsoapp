import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs';

import { SignupService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private signUpService: SignupService) { }

  /** 
   * Uma função que retorna uma função (control) => { }
   */
  checkUserNameTaken() {
    return (control: AbstractControl) => {
      /**
       * Em cada mudança de 300ms em "control" (input), cancela a observação anterior, e passe a observar
       * o resultado da função que verifica se usuário já está sendo usado, depois adicione ao resultado 
       * um objeto cuja propriedade "userNameTaken" é verdadeira, ou um objeto nulo, depois, finalize a 
       * observação (não fique mais observando)
       */
      return control
        .valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap( (userName) => {
            return this.signUpService.checkUserNameTaken(userName);
          })
        )
        .pipe(map( (isTaken) => { 
            return isTaken ? { userNameTaken: true } : null 
          })
        )
        .pipe(first());
    }
  }
}
