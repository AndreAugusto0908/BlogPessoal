import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

/**
 * Tipos válidos para o input do componente.
 */
type InputTypes = "text"  |  "senha"


/**
 * Componente de input personalizado reutilizável que implementa a interface ControlValueAccessor,
 * permitindo integração total com formulários reativos do Angular.
 */
@Component({
  selector: 'app-primary-input',
  imports: [ReactiveFormsModule],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.css'
})
export class PrimaryInputComponent implements ControlValueAccessor {

  /**
   * Define o tipo do input, como 'text' ou 'senha'.
   */
  @Input() type: InputTypes = 'text';

  /**
   * Texto placeholder exibido dentro do input.
   */
  @Input() placeholder: string = '';

  /**
   * Valor atual do input, controlado pelo formulário.
   */
  value: string = '';

  /**
   * Função chamada quando o valor do input muda (controlado pelo Angular).
   */
  onChange: any = () => {};

  /**
   * Função chamada quando o input é tocado (foco perdido).
   */
  onTouched: any = () => {};
  
    /**
   * Dispara o evento de mudança quando o usuário digita no input.
   * @param event Evento de input do campo.
   */
  onInput (event: Event){
    const value = ( event.target as HTMLInputElement).value
    this.onChange(value)
  }

    /**
   * Define o valor no campo de input vindo do formulário.
   * @param value Valor atual do campo.
   */
  writeValue(value: any): void {
      this.value = value
  }

  
  /**
   * Registra a função que deve ser chamada sempre que o valor mudar.
   * @param fn Função de callback passada pelo Angular.
   */
  registerOnChange(fn: any): void {
      this.onChange = fn
  }

    /**
   * Registra a função que deve ser chamada quando o campo for tocado.
   * @param fn Função de callback passada pelo Angular.
   */
  registerOnTouched(fn: any): void {
      this.onTouched = fn
  }

  
  /**
   * Define o estado desabilitado do input (opcional).
   * @param isDisabled Define se o input está desabilitado.
   */
  setDisabledState(isDisabled: boolean): void {}
}
