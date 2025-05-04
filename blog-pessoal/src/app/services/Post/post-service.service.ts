import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/apiUrl';
import { PostResponse } from '../../types/post-resonse.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private usuario! : string | null
  private token! : string | null
  private autor! : string | null

  constructor(private httpClient: HttpClient) { 
    this.usuario = sessionStorage.getItem("username")
    this.token = sessionStorage.getItem("auth-token")
    this.autor = sessionStorage.getItem("id")
  }

  newPost(titulo: string, tema: string, texto: string){
    console.log(titulo, tema, texto, this.usuario)

    const headers = {
      Authorization: `Bearer ${this.token}`
    };

    return this.httpClient.post<PostResponse>(`${API_BASE_URL}/api/postagens`,{
      titulo,
      tema,
      texto,
      usuario: this.usuario
    },{ headers }
    )
  }

  getPostsByUser(){
    const headers = {
      Authorization: `Bearer ${this.token}`
    };

    const params = {
      autor: this.autor ?? ""
    }
    
    return this.httpClient.get<PostResponse[]>(`${API_BASE_URL}/api/postagens/filtro`, 
      { headers, params })
  }

  getAllPosts(){
    const headers = {
      Authorization: `Bearer ${this.token}`
    };

    return this.httpClient.get<PostResponse[]>(`${API_BASE_URL}/api/postagens`, 
      { headers })
  }
}
