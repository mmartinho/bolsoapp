import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Photo } from "./photo";
import { PhotoComment } from "./photo-comment";

const API = environment.apiURL;

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) {}

    listFromUser(userName: string): Observable<Photo[]> {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');       
    }

    listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });       
    }  
    
    upload(description: string, allowComments: boolean, file: File ) : Observable<HttpEvent<any>>{
        /** 
         * Não é json, usamos FormData 
         */
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true': 'false');
        formData.append('imageFile', file);
        
        return this.http.post(
            API+'/photos/upload', 
            formData,
            {
                /**
                 * Observa eventos de relatório de progresso
                 */
                observe: 'events',
                reportProgress: true
            }
        );    
    }

    findById(photoId: number) : Observable<Photo>{
        return this.http
            .get<Photo>(API + '/photos/' + photoId);    
    }

    getComments(photoId: number): Observable<PhotoComment[]> {
        return this.http
            .get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
    }

    addComments(photoId: number, commentText: string) {
        return this.http
            .post(API + '/photos/' + photoId + '/comments', { commentText });        
    }

    removePhoto(photoId: number) {
        return this.http
            .delete(API + '/photos/' + photoId);        
    }

    like(photoId: number) {
        /** 
         * "observe: response" como configuração do "Observable" para que seja 
         * obtido o objeto de resposta no tipo de gerenciamento do Observable 
         */
        return this.http
            .post(API + '/photos/' + photoId + '/like', {}, { observe: 'response'})
            .pipe(
                /**
                 * A partir desse objeto de resposta, sobrepomos todo o objeto 
                 * por um booleano com valor fixo "true" usando a função "map"
                 */
                map(
                    (res) => { 
                        return true; 
                    }
                )
            )
            .pipe(
                /**
                 * Captura qualquer erro que tenha sido obtido no "Observable", e repassa
                 * para a função callback realizar o tratamento deste: 
                 * - emitindo um valor "false", caso o erro repassado seja "304"
                 * - lançando um erro, para qualquer outro erro
                 */
                catchError(
                    (error) => { 
                        return error.status == '304' ? of(false) : throwError(() => Error(error.message))
                    }
                )
            );        
    }
 }
