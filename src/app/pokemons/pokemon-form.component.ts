import { Component, Input, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { PokemonsService} from './pokemons.service'; 
import { Pokemon } from './pokemon'; 
 
@Component({ 
 selector: 'pokemon-form', 
 templateUrl: './pokemon-form.component.html',
 styleUrls: ['./pokemon-form.component.css']
}) 
export class PokemonFormComponent implements OnInit { 
 // propriété d'entrée du composant 
 @Input() pokemon: Pokemon; 
 // types disponibles pour un pokémon : 'Eau', 'Feu', etc.
 types: Array<string>; 
 
 constructor( 
  private pokemonsService: PokemonsService, 
  private router: Router) { } 
 
 ngOnInit() { 
  // Initialisation de la propriété types 
  this.types = this.pokemonsService.getPokemonTypes(); 
 } 
 
 // Détermine si le type passé en paramètres appartient ou non 
 // au pokémon en cours d'édition. 
 hasType(type: string): boolean { 
  let index = this.pokemon.types.indexOf(type); 
  if (index > -1) return true; 
  return false; 
 }  
 
 // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition. 
 selectType($event: any, type: string): void { 
  let checked = $event.target.checked; 
  if (checked) { 
   // Si l'utilisateur coche un type, on l'ajoute à la liste des types du pokémon.
   this.pokemon.types.push(type); 
  } else { 
   // Si l'utilisateur décoche un type, on le retire à la liste des types du pokémon.
   let index = this.pokemon.types.indexOf(type); 
   if (index > -1) { 
    this.pokemon.types.splice(index, 1); 
   } 
  }  
 }

 // Valide le nombre de types pour chaque pokémon (entre 1 et 3)
isTypesValid(type: string): boolean { 
  
  // Le pokémon a un seul type, qui correspond au type passé en paramètre.
  // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché ce type (sinon le pokémon aurait 0 type, ce qui est interdit)
  if (this.pokemon.types.length === 1 && this.hasType(type)) {
   return false;
  }
  
  // Le pokémon a au moins 3 types.
  // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les types existants.
  if (this.pokemon.types.length >= 3 && !this.hasType(type)) { 
   return false; 
  } 
  
  // Après avoir passé les deux tests ci-dessus, on renvoie true, c'est à dire que l'on autorise l'utilisateur a cocher ou décocher un nouveau type.
  return true; 
 }
 
 // La méthode appelée lorsque le formulaire est soumis. 
 onSubmit(): void { 
  console.log("Submit form !"); 
  let link = ['/pokemon', this.pokemon.id]; 
  this.router.navigate(link); 
 } 
 
}