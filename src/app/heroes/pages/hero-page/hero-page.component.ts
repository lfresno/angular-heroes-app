import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) {}

  //porque tenemos que hacer una petición al servicio
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        //delay para debug
        delay(1000),

        //usamos switchmap para usar el id de los params
        switchMap(({id}) => this.heroesService.getHeroById(id)),  //esto tendrá que devolver un heroe o undefined

      ).subscribe( hero => {
        if(!hero) return this.router.navigate(['/heroes/list']); //si no hay héroe, se va a la lista

        this.hero = hero;
        return;
      })
  }

  goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }

}
