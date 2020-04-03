import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonsService } from './pokemons.service'; 

@Component({
  selector : 'detail-pokemon',
  templateUrl : './detail-pokemon.component.html'
 })
 export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon = null;
    
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonsService: PokemonsService) {} 
   
  ngOnInit(): void { 
    let id = +this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);  
  }

  delete(pokemon: Pokemon): void { 
    this.pokemonsService.deletePokemon(pokemon).subscribe(_ => this.goBack());
  }
  
  goBack(): void { 
    this.router.navigate(['/pokemon/all']); 
  }

  goEdit(pokemon: Pokemon): void { 
    let link = ['/pokemon/edit', pokemon.id]; 
    this.router.navigate(link); 
   }
 }