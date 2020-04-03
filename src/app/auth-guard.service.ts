import { Injectable } from '@angular/core'; 
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { AuthService } from './auth.service'; 
 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate { 
 constructor(private authService: AuthService, private router: Router) {}
 
 // La méthode du Guard : 
 // détermine si l'utilisateur peut se connecter ou non ! 
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
  let url: string = state.url; 
  return this.checkLogin(url); 
 } 
 
 // Méthode d'aide pour le Guard, qui interroge notre service. 
 checkLogin(url: string): boolean { 
  if (this.authService.isLoggedIn) { return true; } 
  this.authService.redirectUrl = url; 
  this.router.navigate(['/login']);
  
  return false; 
 } 
}