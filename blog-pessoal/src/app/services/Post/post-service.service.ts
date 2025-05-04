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

  constructor(private httpClient: HttpClient) { 
    this.usuario = sessionStorage.getItem("username")
    this.token = sessionStorage.getItem("auth-token")
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
}
