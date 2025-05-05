import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../types/login-responde.type';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../../constants/apiUrl';
import { jwtDecode } from 'jwt-decode';

/**
 * Interface representando a estrutura do token JWT decodificado.
 */
interface DecodedToken {
  nome: string;
  usuario: string;
  id: number;
  exp: number;
  sub: string;
  iss: string;
}

/**
 * Serviço responsável por realizar a autenticação do usuário na API.
 * Também armazena os dados do token decodificado na sessão.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpCliente: HttpClient) { }

    /**
   * Realiza o login do usuário na API utilizando as credenciais fornecidas.
   * Ao obter sucesso, armazena o token JWT e os dados decodificados no sessionStorage.
   * 
   * @param usuario - Nome de usuário informado no formulário de login.
   * @param senha - Senha correspondente ao usuário.
   * @returns Observable com a resposta do login.
   */
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
