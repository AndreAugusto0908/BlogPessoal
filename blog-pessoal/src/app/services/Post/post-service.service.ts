import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/apiUrl';
import { PostResponse } from '../../types/post-resonse.type';

/**
 * Serviço responsável por gerenciar postagens na aplicação.
 * Inclui funcionalidades como criação, listagem, edição e exclusão de posts,
 * com autenticação via token JWT armazenado na sessão.
 */
@Injectable({
  providedIn: 'root'
})
export class PostService {

    /**
   * Dados extraídos do sessionStorage do navegador:
   * - usuário (username)
   * - token (auth-token)
   * - autor (id)
   */
  private usuario! : string | null
  private token! : string | null
  private autor! : string | null

  constructor(private httpClient: HttpClient) { 
    this.usuario = sessionStorage.getItem("username")
    this.token = sessionStorage.getItem("auth-token")
    this.autor = sessionStorage.getItem("id")
  }

    /**
   * Retorna o cabeçalho de autorização contendo o token JWT.
   * Usado em todas as requisições autenticadas.
   */
  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.token}`
    };
  }

    /**
   * Cria uma nova postagem associada ao usuário logado.
   *
   * @param titulo - Título da postagem.
   * @param tema - Tema da postagem.
   * @param texto - Conteúdo do post.
   * @returns Observable com a resposta da API (PostResponse).
   */
  newPost(titulo: string, tema: string, texto: string){
    return this.httpClient.post<PostResponse>(`${API_BASE_URL}/api/postagens`,{
      titulo,
      tema,
      texto,
      usuario: this.usuario
    },{ headers: this.getAuthHeaders() }
    )
  }

    /**
   * Busca todas as postagens criadas pelo usuário logado (autor).
   *
   * @returns Observable com lista de postagens (PostResponse[]).
   */
  getPostsByUser(){
    const params = {
      autor: this.autor ?? ""
    }
    return this.httpClient.get<PostResponse[]>(`${API_BASE_URL}/api/postagens/filtro`, 
      { headers: this.getAuthHeaders(), params })
  }

    /**
   * Busca todas as postagens disponíveis.
   *
   * @returns Observable com lista de todas as postagens (PostResponse[]).
   */
  getAllPosts(){
    return this.httpClient.get<PostResponse[]>(`${API_BASE_URL}/api/postagens`, 
      { headers: this.getAuthHeaders() })
  }

    /**
   * Exclui uma postagem pelo ID.
   *
   * @param id - Identificador da postagem a ser deletada.
   * @returns Observable da resposta da API.
   */
  delete(id : number){
    return this.httpClient.delete(`${API_BASE_URL}/api/postagens/${id}`,
      { headers: this.getAuthHeaders() })
  }

  
  /**
   * Edita uma postagem existente.
   *
   * @param id - ID da postagem.
   * @param titulo - Novo título.
   * @param tema - Novo tema.
   * @param texto - Novo conteúdo da postagem.
   * @returns Observable da resposta da API.
   */
  editar(id: number, titulo: string, tema: string, texto: string) {
    return this.httpClient.put(`${API_BASE_URL}/api/postagens/${id}`, {
      titulo,
      tema,
      texto
    },{ headers: this.getAuthHeaders() }
    )
  }
}
