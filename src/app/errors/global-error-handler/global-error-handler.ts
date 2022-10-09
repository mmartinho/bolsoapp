import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as StackTrace from 'stacktrace-js';

import { UserService } from '../../core/user/user.service';
import { ServerLogService } from './server-log.service';

/** 
 * Declaramos como "Injectable", sem escopo de 
 * provedor, pois, faremos gestão de dependência na
 * função de manipulação da exceção 
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        /** 
         * Gestor de injeção de dependência necessário 
         */
        private injector: Injector
    ) { }

    handleError(error: any): void {
        /** 
         * Injetando as dependências via "injetor" ao invés
         * de usar a injeção no "construtor". Isso é porque não sabemos
         * que partes da aplicação estarão comprometidas, e é possível
         * que, em estado de Exceção, algumas das dependências não possam 
         * ser instanciadas 
         */
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        const urlFromLocation = location instanceof PathLocationStrategy ? location.path() : '';

        /** 
         * Caso seja do tipo "Error", ele tem uma propriedade "message" 
         */
        const errorMessage = error.message ? error.message : error.toString();

        StackTrace.fromError(error).then(
            allStackFrames => {
                const stackAsString = allStackFrames.map(stackFrameItem => stackFrameItem.toString()).join('\n');
                const serverLog = { 
                    message : errorMessage, 
                    url : urlFromLocation, 
                    user : userService.getUserName(),
                    stack : stackAsString
                }
                console.log(serverLog);
                serverLogService.log(serverLog).subscribe( { 
                    complete: () => {
                        console.log('Error logged on server');
                    },
                    error: (error) => {
                        console.log(error.message)
                    },
                    next : (value) => {
                        if(environment.production) {
                            router.navigate(['/error']);
                        }
                    }
                 });
            }
        );
    }
    
}