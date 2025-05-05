import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


/**
 * Componente de botão de navegação lateral reutilizável.
 * Pode receber um nome e uma rota, e emite um evento ao ser clicado.
 */
@Component({
  selector: 'app-button-sidebar',
  imports: [],
  templateUrl: './button-sidebar.component.html',
  styleUrl: './button-sidebar.component.css'
})
export class ButtonSidebarComponent {

  /**
   * Nome exibido no botão.
   * @example "Home"
   */
  @Input() nameButton: String = "" 

  /**
   * Caminho da rota para comparar com a rota atual e ativar destaque.
   * Deve ser relativo à rota base (ex: "/meuPerfil").
   * @example "/meuPerfil"
   */
  @Input() route: string = "";

  /**
   * Evento emitido ao clicar no botão.
   * Útil para o componente pai executar navegação ou lógica extra.
   */
  @Output("submit") onSubmit = new EventEmitter();

  constructor(private router: Router) {}

  /**
   * Verifica se a rota atual do Angular corresponde à rota atribuída ao botão.
   * Utilizado para destacar o botão ativo.
   * @returns true se a rota estiver ativa, senão false
   */
  isActiveRoute(): boolean {
    return this.router.url === `/auth/dashboard${this.route}`;
  }

    /**
   * Emite o evento `submit` ao clicar no botão.
   */
  sumbit(){
    this.onSubmit.emit();
  }

}
