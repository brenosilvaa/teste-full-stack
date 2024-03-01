// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly validEmail = 'teste.full@gmail.com';
    private readonly validPassword = '123456';

    isLoggedIn(): boolean {
        return !!localStorage.getItem('loggedin');
    }

    login(email: string, password: string): boolean {
        // Simulando verificação de email e senha
        if (email === this.validEmail && password === this.validPassword) {
            localStorage.setItem('loggedin', 'true');
            return true;
        } else {
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem('loggedin');
    }
}
