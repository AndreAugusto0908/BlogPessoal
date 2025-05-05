import { Component, Input } from '@angular/core';
import { PostService } from '../../../services/Post/post-service.service';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from '../../../types/post-resonse.type';
import { EditPostComponent } from '../../forms/edit-post/edit-post.component';

/**
 * Componente responsável por exibir os dados do usuário e seus posts,
 * incluindo ações como deletar e editar postagens.
 */
@Component({
  selector: 'app-meu-perfil-comp',
  imports: [
    EditPostComponent
  ],
  templateUrl: './meu-perfil-comp.component.html',
  styleUrl: './meu-perfil-comp.component.css'
})
export class MeuPerfilCompComponent {

  
  /**
   * Lista de postagens do usuário logado.
   */
  userPosts: PostResponse[] = []

    /**
   * Controla a exibição do formulário de edição.
   */
  mostrarFormulario = false
    /**
   * Armazena o post selecionado para edição.
   */
  postSelecionado!: PostResponse;

  
  /**
   * Nome completo do usuário (recebido via sessionStorage ou @Input).
   */
    @Input() name : string = sessionStorage.getItem("nome") ?? ""

      /**
   * Nome de usuário (login) recebido do sessionStorage ou como @Input.
   */
    @Input() username : string = sessionStorage.getItem("username") ?? ""

        constructor(
          private postService : PostService,
          private toastService : ToastrService
        ){}
    
          /**
   * Inicializa o componente buscando todas as postagens do usuário.
   */
    ngOnInit(): void {
      this.getAllPostUser()
    }

      /**
   * Retorna o número total de postagens do usuário.
   */
    numeroPosts(): number{
      return this.userPosts.length
    }

      /**
   * Busca todas as postagens feitas pelo usuário autenticado.
   */
    getAllPostUser(){
      this.postService.getPostsByUser().subscribe({
        next: (posts)  => {this.userPosts = posts},
        error: () => this.toastService.error("Erro inesperado ao carregar temas tente novamente mais tarde")
      })
    }

      /**
   * Deleta um post do usuário e atualiza a lista exibida.
   * 
   * @param id ID do post a ser deletado
   */ 
    deletePost(id : number){
      console.log("Deletar")
      this.postService.delete(id).subscribe({
        next : () => {
          this.userPosts = this.userPosts.filter(post => post.id !== id);
          this.toastService.success("Post Apagado com sucesso")},
        error: () => this.toastService.error("Erro ao apagar post tente novamente mais tarde")
      })
    }

      /**
   * Alterna a visibilidade do formulário de edição e define o post selecionado.
   * 
   * @param post Post que será editado
   */
    onFormularioClick(post: PostResponse){
      console.log("Abrir edição")
      this.mostrarFormulario = !this.mostrarFormulario
      this.postSelecionado = post;
    }



}
