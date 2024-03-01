import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn) {
            return true; // Permitir acesso se estiver autenticado
        } else {
            // Redirecionar para a página de login se não estiver autenticado
            this.router.navigate(['/login']);
            return false;
        }
    }
}