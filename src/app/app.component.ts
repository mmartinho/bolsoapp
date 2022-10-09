import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 

  constructor(
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ){}

  ngOnInit(): void {
    this.router.events
      /**
       * Queremos nos inscrever apenas na rota "NavigationEnd" 
       * (o momento em que a rota efetivamente chegou ao seu fim) 
       */    
      .pipe(filter(event => { 
        return event instanceof NavigationEnd; 
      }))
      /**
       * Queremos ter acesso ao conteúdo do "activatedRoute",
       * então, para melhorar a legibilidade do código, 
       * inseriremos em pipe() um map(), em que retornaremos 
       * "this.activatedRoute"
       */
      .pipe(map(() => {
        return this.activatedRoute; 
      }))
      /**
       * No próximo pipe, o "return" anterior de "activateRoute" 
       * passa a ser chamado de "route"
       */
      .pipe(map(route => {
        /** Subindo na hierarquia de rotas... */
        while(route.firstChild) {
          route = route.firstChild;
        }
        /** ...retorna a primeira */
        return route;
      }))
      /**
       * A rota correta capturada, entra como parâmetro na função
       * do switchMap, por sua vez, repassa as propriedades "data" 
       */
      .pipe(switchMap(route => { 
        return route.data; 
      }))
      /**
       * O Observable, por sua vez, recebe o data, onde, finalmente, 
       * invocamos o serviço "titleService" para mudar o título, consumindo
       * o Observable
       */
      .subscribe(data => this.titleService.setTitle(data['title']));
  }   

}
