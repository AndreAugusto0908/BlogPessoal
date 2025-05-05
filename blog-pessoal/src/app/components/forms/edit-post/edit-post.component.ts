  import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
  import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { TemaResponse } from '../../../types/tema-response.type';
  import { ToastrService } from 'ngx-toastr';
  import { PostService } from '../../../services/Post/post-service.service';
  import { TemaService } from '../../../services/Tema/tema.service';
  import { PostResponse } from '../../../types/post-resonse.type';

  
/**
 * Interface para o formulário de edição de postagens.
 */
  interface EditForm{
    titulo : FormControl,
    tema : FormControl,
    texto : FormControl
  }
  /**
 * Componente responsável por editar uma postagem existente.
 * Ele recebe os dados via @Input e emite um evento para fechar o formulário após salvar.
 */
  @Component({
    selector: 'app-edit-post',
    imports: [
      ReactiveFormsModule
    ],
    templateUrl: './edit-post.component.html',
    styleUrl: './edit-post.component.css'
  })
  export class EditPostComponent implements OnInit {

  /**
   * Formulário reativo com campos de título, tema e texto.
   */
  editForm!: FormGroup<EditForm>;

  /**
   * Lista de temas disponíveis no sistema, usada para preencher o select.
   */
  temas: TemaResponse[] = [];

  /**
   * Postagem a ser editada, recebida como entrada pelo componente pai.
   */
  @Input() post!: PostResponse;

  /**
   * Evento emitido para o componente pai solicitando o fechamento do formulário.
   */
  @Output() closeForm = new EventEmitter<void>();

  /**
   * ID da postagem sendo editada.
   */
  idPost!: number;

    constructor(
      private toastService : ToastrService,
      private postService : PostService,
      private temaService : TemaService
    ){
      this.editForm = new FormGroup({
        titulo: new FormControl("", [Validators.required, Validators.min(3), Validators.max(30)]),
        tema : new FormControl ("", [Validators.required]),
        texto : new FormControl ("", [Validators.required, Validators.min(3)])
      })
    }

      /**
   * Inicializa o componente e o formulário com os dados do post.
   * Também carrega os temas disponíveis no sistema.
   */
    ngOnInit(): void {
      this.getNameTema();
    
      if (this.post) {
        this.editForm.setValue({
          titulo: this.post.titulo,
          tema: this.post.tema,
          texto: this.post.texto
        });
        this.idPost = this.post.id;
      }
    }

    
  /**
   * Submete a edição do post chamando o serviço e mostrando feedback ao usuário.
   * Emite o evento `closeForm` ao final do processo (sucesso ou erro).
   */
    submit(){
      this.postService.editar(this.idPost ,this.editForm.value.titulo, this.editForm.value.tema, this.editForm.value.texto).subscribe({
        next : () => {this.toastService.success("Post editado com Sucesso")
        this.closeForm.emit()},
        error: () => {this.toastService.error("Erro inesperado ao editar post tente novamente mais tarde")
          this.closeForm.emit()}
      })
    }

      /**
   * Carrega todos os temas disponíveis da API para exibir no select.
   */
    getNameTema(){
      this.temaService.getAllTemas().subscribe({
        next: (temas) => {this.temas = temas},
        error: () => this.toastService.error("Erro inesperado ao carregar temas tente novamente mais tarde")
      })
    }
  }
