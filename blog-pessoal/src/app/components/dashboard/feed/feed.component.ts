import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from '../../../types/post-resonse.type';
import { PostService } from '../../../services/Post/post-service.service';
import { ToastrService } from 'ngx-toastr';
import { TemaService } from '../../../services/Tema/tema.service';
import { TemaResponse } from '../../../types/tema-response.type';
import { FormsModule } from '@angular/forms';

/**
 * Componente responsável por exibir o feed de postagens.
 * Permite filtrar os posts por tema e exibe todos os posts recuperados da API.
 */
@Component({
  selector: 'app-feed',
  imports: [
    FormsModule
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

    /**
   * Lista completa de postagens carregadas da API.
   */
  allPosts: PostResponse[] = []

    /**
   * Lista completa de temas disponíveis para filtro.
   */
  allTemas: TemaResponse[] = []

    /**
   * Tema selecionado no filtro.
   */
  temaSelecionado: string = '';

  
  /**
   * Lista de postagens filtradas com base no tema selecionado.
   */
  postsFiltrados: PostResponse[] = [];

    constructor(
      private postService : PostService,
      private temaService : TemaService,
      private toastService : ToastrService
    ){}

    
  /**
   * Inicializa o componente carregando todos os posts e temas disponíveis.
   */
    ngOnInit(): void {
      this.getAllPost();
      this.getAllTemas();
    }

    
  /**
   * Requisita todas as postagens da API e aplica o filtro de tema, se houver.
   */
    getAllPost() {
      this.postService.getAllPosts().subscribe({
        next: (posts) => {
          this.allPosts = posts;
          this.filtrarPosts('');
        },
        error: () =>
          this.toastService.error(
            'Erro inesperado ao carregar Posts tente novamente mais tarde'
          ),
      });
    }

    
  /**
   * Requisita todos os temas disponíveis da API.
   */
    getAllTemas(){
      this.temaService.getAllTemas().subscribe({
        next: (temas) => {this.allTemas = temas},
        error: () => this.toastService.error("Erro inesperado ao carregar Temas tente novamente mais tarde")
      })
    }

      /**
   * Filtra os posts com base no tema selecionado.
   * 
   * @param valorSelecionado - O nome do tema selecionado ou string vazia para mostrar todos.
   */
    filtrarPosts(valorSelecionado: string) {
      this.temaSelecionado = valorSelecionado;
      this.postsFiltrados = valorSelecionado
        ? this.allPosts.filter((post) => post.tema === valorSelecionado)
        : this.allPosts;
    }

}
