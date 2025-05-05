import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemaResponse } from '../../../types/tema-response.type';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../../services/Post/post-service.service';
import { TemaService } from '../../../services/Tema/tema.service';
import { PostResponse } from '../../../types/post-resonse.type';

interface EditForm{
  titulo : FormControl,
  tema : FormControl,
  texto : FormControl
}

@Component({
  selector: 'app-edit-post',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {

  editForm!: FormGroup<EditForm>
  temas: TemaResponse[] = []

  @Input() post!: PostResponse;
  @Output() closeForm = new EventEmitter<void>();

  titulo: string = '';
  tema: string = '';
  texto: string = '';
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

  submit(){
    this.postService.editar(this.idPost ,this.editForm.value.titulo, this.editForm.value.tema, this.editForm.value.texto).subscribe({
      next : () => {this.toastService.success("Post editado com Sucesso")
      this.closeForm.emit()},
      error: () => {this.toastService.error("Erro inesperado ao editar post tente novamente mais tarde")
        this.closeForm.emit()}
    })
  }

  getNameTema(){
    this.temaService.getAllTemas().subscribe({
      next: (temas) => {this.temas = temas},
      error: () => this.toastService.error("Erro inesperado ao carregar temas tente novamente mais tarde")
    })
  }
}
