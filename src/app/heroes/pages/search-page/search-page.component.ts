import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  //si queremos usar un formulario reactivo, hay que importar su móduolo ReactiveFormsModule (en heroes module)
  //esto es un input reactivo. Esto le permite tener algunos métodos
  public searchInput = new FormControl('');

  public heroes: Hero[] = [];
  public selectedHero? : Hero;


  constructor( private heroesService: HeroesService) {}

  searchHero() {
    //no es recomendable usar el operador not nullable !
    const value:string = this.searchInput.value || '';

    console.log({value});

    //guardamos en heroes los heroes que nos devuelve el servicio al hacer la búsqueda
    this.heroesService.getSuggestions(value)
      .subscribe( heroes => this.heroes = heroes);

  }

  //método que viene con Angular Material
  //hay que implementarlo y personalizarlo, pero ya viene su nombre y su entrada definido
  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    console.log(event.option.value);  //tendrá un string vacío si no se encuentra en la bd o el valor que se ha seleccionado en el autocomplete

    //si se ha elegido un valor que no existe en la bd:
    if(!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }

}
