import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/apiUrl';
import { TemaResponse } from '../../types/tema-response.type';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private token! : string | null
  constructor(private httpClient: HttpClient) {
    this.token = sessionStorage.getItem("auth-token")
  }

  getAllTemas(){
    const headers = {
      Authorization: `Bearer ${this.token}`
    };

    return this.httpClient.get<TemaResponse[]>(`${API_BASE_URL}/api/temas`, { headers })
  }
}
