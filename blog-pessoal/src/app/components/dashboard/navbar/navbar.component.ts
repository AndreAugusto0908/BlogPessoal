import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewPostComponent } from '../../forms/new-post/new-post.component';
import { Router } from '@angular/router';

/**
 * Componente da barra de navegação principal do sistema.
 * Exibe o nome do usuário, controla o formulário de criação de postagens
 * e permite navegação entre seções como Home, Perfil e Estatísticas.
 */
@Component({
  selector: 'app-navbar',
  imports: [
    NewPostComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
      /**
   * Controla a exibição do componente de criação de nova postagem.
   */
    mostrarFormulario = false

    mostrarLogout: boolean = false;

    
  /**
   * Nome do usuário autenticado, recebido via sessionStorage ou como Input externo.
   */
    @Input() name : string = sessionStorage.getItem("nome") ?? ""

    
  constructor(private router: Router) {}

  
  /**
   * Alterna a visibilidade do formulário de nova postagem.
   */
    onFormularioClick(){
      this.mostrarFormulario = !this.mostrarFormulario
    }


      /**
   * Navega para a página inicial do dashboard (/auth/dashboard).
   */
    irParaHome() {
      this.router.navigate(['/auth/dashboard']);
    }
    
    
  /**
   * Navega para a página "Meu Perfil" do usuário (/auth/dashboard/meuPerfil).
   */
    irParaPerfil() {
      this.router.navigate(['/auth/dashboard/meuPerfil']);
    }
    
    
  /**
   * Navega para a página de estatísticas do blog (/auth/dashboard/stats).
   */
    irParaEstatisticas() {
      this.router.navigate(['/auth/dashboard/stats']);
    }

      /**
   * Alterna a visibilidade do formulário de logout.
   */
    toggleLogoutMenu() {
      this.mostrarLogout = !this.mostrarLogout;
    }


      /**
   * Realiza limpeza da sessão e retorna usuario para pagina inicial
   */
logout() {
  sessionStorage.clear();
  this.router.navigate(['/']);
}
}
