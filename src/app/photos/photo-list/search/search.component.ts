import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  /** Icone F Awesome */
  faSearch = faSearch;
  
  @Output() onTyping : EventEmitter<string> = new EventEmitter<string>();
  @Input() searchValue: string = '';
  
  debounce: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe( (filter) => { 
        this.onTyping.emit(filter); 
      });   
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }  

}
