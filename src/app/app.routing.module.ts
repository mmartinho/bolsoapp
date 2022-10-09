import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { EusouComponent } from './bolso/eusou/eusou.component';
import { QuemsouComponent } from './bolso/quemsou/quemsou.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bolsonaro/quemsou'
    },
    { 
        path: 'bolsonaro/eusou', 
        component: EusouComponent,
        data: {
            title: 'Eu Sou Bolsonaro'
        }
    }, 
    { 
        path: 'bolsonaro/quemsou', 
        component: QuemsouComponent,
        data: {
            title: 'Meu Nome'
        }
    },           
    { 
        path: 'not-found', 
        component: NotFoundComponent,
        data: {
            title: 'Not Found'
        }          
    },  
    { 
        path: 'error', 
        component: GlobalErrorComponent,
        data: {
            title: 'Error'
        }          
    },          
    { 
        path: '**', 
        redirectTo: 'not-found ' 
    }  
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

