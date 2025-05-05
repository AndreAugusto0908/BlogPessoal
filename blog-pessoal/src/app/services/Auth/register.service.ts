import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/apiUrl';

/**
 * Serviço responsável por registrar novos usuários na aplicação.
 * Envia os dados de cadastro para a API e retorna o resultado da requisição.
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient) { }

  /**
   * Realiza o cadastro de um novo usuário.
   *
   * @param nome - Nome completo do usuário.
   * @param usuario - Nome de usuário escolhido.
   * @param senha - Senha de acesso definida pelo usuário.
   * @returns Observable com a resposta da API.
   */
  register(nome : string, usuario : string, senha : string){
    console.log(nome, senha, usuario)
    return this.httpClient.post(`${API_BASE_URL}/api/usuarios`, {nome, usuario, senha})
  }
}
