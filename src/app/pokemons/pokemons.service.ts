import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon'; 
import { POKEMONS } from './mock-pokemons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root',
 })
export class PokemonsService {

  private pokemonsUrl = 'api/pokemons';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> { 
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
     tap(_ => this.log(`fetched pokemons`)),
     catchError(this.handleError('getPokemons', []))
    ); 
   }
  
  getPokemon(id: number): Observable<Pokemon> { 
    const url =`${this.pokemonsUrl}/${id}`; // syntaxe ES6  
  
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> { 
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    
    return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe( 
     tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
     catchError(this.handleError<any>('updatePokemon'))
    );
  }

  deletePokemon(pokemon : Pokemon): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${pokemon.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
     
    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted pokemon id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>('deletePokemon'))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    return this.http.post<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
     tap((pokemon: Pokemon) => this.log(`added pokemon with id=${pokemon.id}`)),
     catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }
  
  getPokemonTypes(): Array<string> { 
    return [ 
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy' 
    ]; 
  }

  private log(log : string) {
    console.info(log) ;
  }

  private handleError<T>(operation='operation', result?: T){ 
    return (error :any): Observable<T> => {
     console.log(error);
     console.log(`${operation} failed: ${error.message}`);
        
     return of(result as T);
    } 
   }
}