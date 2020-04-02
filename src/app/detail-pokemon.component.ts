import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

@Component({
  selector : 'detail-pokemon',
  templateUrl : './detail-pokemon.component.html'
 })
 export class DetailPokemonComponent implements OnInit { 
  pokemons: Pokemon[] = null; // La liste des pokémons de notre application.
  pokemon: Pokemon = null; // Le pokémon à afficher dans le template.
    
  // On injecte 'route' pour récupérer les paramètres de l'url,
  // et 'router' pour rediriger l'utilisateur.
  constructor(private route: ActivatedRoute, private router: Router) {} 
   
  ngOnInit(): void { 
   // On initialise la liste de nos pokémons :
   this.pokemons = POKEMONS; 
   // On récupère le paramère 'id' contenu dans l'url :
   let id = +this.route.snapshot.paramMap.get("id");  
   // On itère sur le tableau de pokémons pour trouver le pokémon avec le bon identifiant : 
   for (let i = 0; i < this.pokemons.length; i++) { 
    // Si on trouve un pokémon avec le bon identifiant, 
    // on affecte ce pokémon à la propriété du composant :
    if (this.pokemons[i].id == id) { 
     this.pokemon = this.pokemons[i]; 
    }
   } 
  } 
  
  // Méthode permettant de rediriger l'utilisateur vers la page principale de l'application. 
  goBack(): void { 
   this.router.navigate(['/pokemons']); 
  } 
 }