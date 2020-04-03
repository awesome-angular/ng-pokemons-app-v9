import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon'; 
import { POKEMONS } from './mock-pokemons'; 
 
@Injectable({
  providedIn: 'root',
 })
export class PokemonsService {
  // Retourne tous les pokémons 
  getPokemons(): Pokemon[] { 
    return POKEMONS; 
  } 
  
  // Retourne le pokémon avec l'identifiant passé en paramètre 
  getPokemon(id: number) { 
    let pokemons = this.getPokemons(); 
    for(let index = 0; index < pokemons.length; index++) { 
    if(id === pokemons[index].id) { 
      return pokemons[index]; 
    } 
    } 
  }
  
  getPokemonTypes(): Array<string> { 
    return [ 
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy' 
    ]; 
  }
}