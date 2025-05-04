import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../types/login-responde.type';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../../constants/apiUrl';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  nome: string;
  usuario: string;
  id: number;
  exp: number;
  sub: string;
  iss: string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpCliente: HttpClient) { }

  login(usuario: string, senha : string){
    return this.httpCliente.post<LoginResponse>(`${API_BASE_URL}/api/usuarios/login`, {usuario, senha}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        const decoded = jwtDecode<DecodedToken>(value.token);
        sessionStorage.setItem("username", decoded.usuario);
        sessionStorage.setItem("nome", decoded.nome);
        sessionStorage.setItem("id", decoded.id.toString());
      })
    )
  }
}
