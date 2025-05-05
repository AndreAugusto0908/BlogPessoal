import { Component, Input, OnInit } from '@angular/core';
import { ButtonSidebarComponent } from '../components/button-sidebar/button-sidebar.component';
import { PostService } from '../../../services/Post/post-service.service';
import { PostResponse } from '../../../types/post-resonse.type';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

/**
 * Componente de barra lateral (Sidebar) responsável por navegação
 * e exibição de dados do usuário autenticado, como nome e total de posts.
 */
@Component({
  selector: 'app-sidebar',
  imports: [
    ButtonSidebarComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  /**
 * Lista de postagens do usuário atual.
 */
  userPosts: PostResponse[] = []

  /**
     * Nome abreviado do usuário (exibido como avatar lateral).
     * Pode ser passado externamente.
     */
  @Input() smallName: string = 'LG';

  /**
   * Nome completo do usuário, padrão do sessionStorage.
   */
  @Input() name: string = sessionStorage.getItem("nome") ?? "";

  /**
   * Nome de usuário (login), padrão do sessionStorage.
   */
  @Input() username: string = sessionStorage.getItem("username") ?? "";

  constructor(
    private toastService: ToastrService,
    private postService: PostService,
    private router: Router
  ) { }

    /**
   * Ao inicializar o componente, carrega todos os posts do usuário.
   */
  ngOnInit(): void {
    this.getAllPostUser()
  }

  /**
   * Faz a requisição para buscar todas as postagens feitas pelo usuário logado.
   */
  getAllPostUser() {
    this.postService.getPostsByUser().subscribe({
      next: (posts) => { this.userPosts = posts },
      error: () => this.toastService.error("Erro inesperado ao carregar temas tente novamente mais tarde")
    })
  }

    /**
   * Redireciona para uma página do dashboard com base no valor passado.
   * 
   * @param pagina - Rota final (ex: '', '/meuPerfil', '/stats')
   */
  mudarPagina(pagina: string) {
    this.router.navigate(['auth/dashboard' + pagina])
  }
}

