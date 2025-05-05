import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from '../../../types/post-resonse.type';
import { PostService } from '../../../services/Post/post-service.service';
import { ToastrService } from 'ngx-toastr';
import { TemaService } from '../../../services/Tema/tema.service';
import { TemaResponse } from '../../../types/tema-response.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  imports: [
    FormsModule
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  allPosts: PostResponse[] = []
  allTemas: TemaResponse[] = []

  temaSelecionado: string = '';
  postsFiltrados: PostResponse[] = [];

    constructor(
      private postService : PostService,
      private temaService : TemaService,
      private toastService : ToastrService
    ){}

    ngOnInit(): void {
      this.getAllPost();
      this.getAllTemas();
    }

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

    getAllTemas(){
      this.temaService.getAllTemas().subscribe({
        next: (temas) => {this.allTemas = temas},
        error: () => this.toastService.error("Erro inesperado ao carregar Temas tente novamente mais tarde")
      })
    }

    filtrarPosts(valorSelecionado: string) {
      this.temaSelecionado = valorSelecionado;
      this.postsFiltrados = valorSelecionado
        ? this.allPosts.filter((post) => post.tema === valorSelecionado)
        : this.allPosts;
    }

}
