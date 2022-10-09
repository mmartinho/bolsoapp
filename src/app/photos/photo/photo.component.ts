import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

const IMG_PATH = 'imgs';
const URL = environment.apiURL;

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    private _url: string|undefined = '';
    
    @Input() description : string|undefined = '';
    
    /** Ajuste do caminho da url via setter */
    @Input() set url(url: string|undefined) {
        if(url) {
            if(!url.startsWith('data')) {
                this._url = URL + '/' +  IMG_PATH + '/' + url;
            } else { 
                this._url = url;
            }
        }
    }

    /** Ajuste do caminho da url via getter */
    get url() {
        return this._url;
    }
}