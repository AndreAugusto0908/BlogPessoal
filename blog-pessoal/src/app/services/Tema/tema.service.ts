import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/apiUrl';
import { TemaResponse } from '../../types/tema-response.type';

/**
 * Serviço responsável por interagir com a API de temas.
 * Realiza requisições autenticadas para buscar todos os temas disponíveis.
 */
@Injectable({
  providedIn: 'root'
})
export class TemaService {
    /**
   * Token JWT extraído do sessionStorage para autenticação nas requisições.
   */
  private token! : string | null
  constructor(private httpClient: HttpClient) {
    this.token = sessionStorage.getItem("auth-token")
  }

    /**
   * Realiza a requisição para buscar todos os temas cadastrados na API.
   * Inclui o cabeçalho de autorização com o token JWT.
   *
   * @returns Observable com um array de objetos do tipo TemaResponse.
   */
  getAllTemas(){
    const headers = {
      Authorization: `Bearer ${this.token}`
    };

    return this.httpClient.get<TemaResponse[]>(`${API_BASE_URL}/api/temas`, { headers })
  }
}
