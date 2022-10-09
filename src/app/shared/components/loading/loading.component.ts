import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoadingType } from './loading-type';
import { LoadingService } from './loading.service';

@Component({
  selector: 'ap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  /** 
   * Era Observable<LoadingType>, mas, fizemos um map 
   * para emitir um "string" ao invés de ume "enum" 
   */
  loadingObservable! : Observable<string>;  

  constructor(private loadingService : LoadingService) { }

  ngOnInit(): void {
    this.loadingObservable = this.loadingService
        .getLoading()
        /** 
         * Mapeando a emissão de "enum" para "string". Dessa forma, podemos 
         * fazer o "async pipe" diratemente na "class" do elemento no 
         * template
         */
        .pipe(map(loadingType => { return loadingType.valueOf(); }));
  }

}
