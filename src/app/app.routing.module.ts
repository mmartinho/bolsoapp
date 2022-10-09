import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { EusouComponent } from './bolso/eusou/eusou.component';
import { QuemsouComponent } from './bolso/quemsou/quemsou.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    { 
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        },
        data: {
            title: 'Timeline'
        }
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
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Photo upload'
        } 
    },
    { 
        path: 'p/:photoId', 
        component: PhotoDetailsComponent,
        data: {
            title: 'Photo detail'
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

