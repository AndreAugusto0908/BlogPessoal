import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../types/login-responde.type';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpCliente: HttpClient) { }

  login(usuario: string, senha : string){
    return this.httpCliente.post<LoginResponse>(`${API_BASE_URL}/api/usuarios/login`, {usuario, senha}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
      })
    )
  }
}
