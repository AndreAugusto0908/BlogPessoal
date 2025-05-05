import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PrimaryInputComponent } from '../../primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../../services/Post/post-service.service';
import { TemaService } from '../../../services/Tema/tema.service';
import { TemaResponse } from '../../../types/tema-response.type';
/**
 * Interface que define os controles do formulário de nova postagem.
 */
interface PostForm{
  titulo : FormControl,
  tema : FormControl,
  texto : FormControl
}


/**
 * Componente responsável por exibir e processar o formulário de criação de nova postagem.
 */
@Component({
  selector: 'app-new-post',
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {

  /**
   * Formulário reativo contendo os campos de nova postagem.
   */
  postForm!: FormGroup<PostForm>;

  /**
   * Lista de temas disponíveis, utilizada no campo select.
   */
  temas: TemaResponse[] = [];

  /**
   * Evento emitido para o componente pai solicitando o fechamento do formulário.
   */
  @Output() closeForm = new EventEmitter<void>();

  constructor(
    private toastService : ToastrService,
    private postService : PostService,
    private temaService : TemaService
  ){
    this.postForm = new FormGroup({
      titulo: new FormControl("", [Validators.required, Validators.min(3), Validators.max(30)]),
      tema : new FormControl ("", [Validators.required]),
      texto : new FormControl ("", [Validators.required, Validators.min(3)])
    })
  }

    /**
   * Ao iniciar o componente, carrega os temas disponíveis.
   */
  ngOnInit(): void {
      this.getNameTema()
  }

  
  /**
   * Envia os dados do formulário para o serviço de postagem e exibe feedback.
   * Emite o evento de fechamento ao final.
   */
  submit(){
    this.postService.newPost(this.postForm.value.titulo, this.postForm.value.tema, this.postForm.value.texto).subscribe({
      next: () => {this.toastService.success("Post Realizado")
        this.closeForm.emit()
      },
      error: () => this.toastService.error("Erro inesperado tente novamente mais tarde")
    })
  }

  
  /**
   * Busca os temas disponíveis para preencher o select do formulário.
   */
  getNameTema(){
    this.temaService.getAllTemas().subscribe({
      next: (temas) => {this.temas = temas},
      error: () => this.toastService.error("Erro inesperado ao carregar temas tente novamente mais tarde")
    })
  }
  
}
