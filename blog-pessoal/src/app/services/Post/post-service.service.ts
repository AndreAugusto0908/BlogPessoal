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
  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.token}`
    };
  }


  newPost(titulo: string, tema: string, texto: string){
    return this.httpClient.post<PostResponse>(`${API_BASE_URL}/api/postagens`,{
      titulo,
      tema,
      texto,
      usuario: this.usuario
    },{ headers: this.getAuthHeaders() }
    )
  }

  getPostsByUser(){
    const params = {
      autor: this.autor ?? ""
    }
    return this.httpClient.get<PostResponse[]>(`${API_BASE_URL}/api/postagens/filtro`, 
      { headers: this.getAuthHeaders(), params })
  }

  getAllPosts(){
    return this.httpClient.get<PostResponse[]>(`${API_BASE_URL}/api/postagens`, 
      { headers: this.getAuthHeaders() })
  }

  delete(id : number){
    return this.httpClient.delete(`${API_BASE_URL}/api/postagens/${id}`,
      { headers: this.getAuthHeaders() })
  }

  editar(id: number, titulo: string, tema: string, texto: string) {
    return this.httpClient.put(`${API_BASE_URL}/api/postagens/${id}`, {
      titulo,
      tema,
      texto
    },{ headers: this.getAuthHeaders() }
    )
  }
}
