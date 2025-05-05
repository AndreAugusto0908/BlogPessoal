import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente genérico de login usado para renderizar layouts de tela de autenticação
 * com textos personalizáveis e botões com ações externas.
 */
@Component({
  selector: 'app-default-login',
  imports: [],
  templateUrl: './default-login.component.html',
  styleUrl: './default-login.component.css'
})
export class DefaultLoginComponent {
  /**
   * Texto complementar exibido abaixo do título principal.
   */
  @Input() subText: string = "";

  /**
   * Texto destacado em amarelo (normalmente usado para links ou chamadas).
   */
  @Input() yellowSubText: string = "";

  /**
   * Texto exibido no botão de ação (ex: "Entrar", "Cadastrar").
   */
  @Input() bttnText: string = "";

  /**
   * Controla se o botão de ação estará desabilitado.
   */
  @Input() disableButton: boolean = true;

  /**
   * Evento emitido quando o botão de ação principal é clicado.
   * Ex: login, cadastro ou envio de formulário.
   */
  @Output("submit") onSubmit = new EventEmitter<void>();

  /**
   * Evento emitido quando o usuário clica no texto amarelo (navegação secundária).
   * Ex: "Cadastre-se", "Esqueci minha senha", etc.
   */
  @Output("navigate") onNavigate = new EventEmitter<void>();

      /**
   * Aciona o evento de submissão.
   */
    sumbit(){
      this.onSubmit.emit();
    }

      /**
   * Aciona o evento de navegação.
   */
    navigate(){
      this.onNavigate.emit();
    }
}
