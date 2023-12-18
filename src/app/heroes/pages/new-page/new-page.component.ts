import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  //EN FORMULARIOS REACTIVOS, LA MAYOR PARTE DE LA FUNCIONALIDAD ESTÁ EN EL ARCHIVO TS
  //En formularios reactivos ya tenemos algunos métodos implementados, como el debounce time

  //cremos todo cono un formulario conjunto y no como propiedades separadas, para que estas no sean
  //"independientes" entre sí
  //así, si uno de los campos falla, el formulario falla y no permite hacer la operación
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.Otro),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });

  public publishers = [
    {id: 'DC Comics', desc:'DC - Comics'},
    {id: 'Marvel Comics', desc:'Marvel - Comics'},
    {id: 'Otro', desc:'Otro'},
  ];


  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {

    if( !this.router.url.includes('edit') ) return; //si NO se está editando, salimos

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroById(id)),  //desestructuramos el id de los params
      ).subscribe( hero=> {
        if( !hero ) return this.router.navigateByUrl('/');  //si no existe, salimos

        this.heroForm.reset( hero );
        return;
      })

  }

  get currentHero(): Hero {

    const hero:Hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit():void {

    if(this.heroForm.invalid) return;

    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value,
    // });

    if( this.currentHero.id ) {
      this.heroesService.updateHero(this.currentHero )  //Esto es un observable que no se va a disparar si no nos suscribimos
        .subscribe( hero => {
          //mostrar mensaje
          this.showSnackbar(`${hero.superhero} actualizado!`);
        });

        return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        //mostrar mensaje y navegar a /heroes/edit/hero.id
        this.showSnackbar(`${hero.superhero} creado!`);
        this.router.navigate(['/heroes/edit', hero.id]);
      });
  }

  //método para confirmar el borrado
  onDeleteHero() {
    if(!this.currentHero.id) throw Error('Hero id is required');

    //se abre la caja de diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    //resultado del dialogo. Se ejecuta cuando se cierre la caja de diálogo

    //ESTAMOOS REESCRIBIENDO LO DE ABAJO CON MEJOR SINTAXIS
    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result === true),  //se filtra para que solo pasen los resultadps que han dado true (los que dicen que sí a borrar)
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),  //disparo el otro observable
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {     //si no hay nadie suscrito, la acción del observable es como si no se ejecutase
        this.router.navigate(['/heroes']);

      });

    // //resultado del dialogo. Se ejecuta cuando se cierre la caja de diálogop
    // dialogRef.afterClosed()
    //   .subscribe( result => {
    //   // console.log('The dialog was closed');
    //   // console.log({result});

    //   if(!result) return; //es decir, NO se quiere borrar

    //   console.log('deleted')


    //   //llamamos a la eliminación
    //   this.heroesService.deleteHeroById( this.currentHero.id )
    //     .subscribe( wasDeleted => {     //si no hay nadie suscrito, la acción del observable es como si no se ejecutase
    //       if(wasDeleted)
    //         this.router.navigate(['/heroes/list']);
    //     });

    // });

  }


  //cremos un método para mostrar la snackbar
  showSnackbar( msg:string ): void {
    this.snackbar.open( msg, 'done', {
      duration:2500
    })
  }

}
