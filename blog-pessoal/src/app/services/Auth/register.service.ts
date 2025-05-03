import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient) { }

  register(nome : string, usuario : string, senha : string){
    console.log(nome, senha, usuario)
    return this.httpClient.post(`${API_BASE_URL}/api/usuarios`, {nome, usuario, senha})
  }
}
