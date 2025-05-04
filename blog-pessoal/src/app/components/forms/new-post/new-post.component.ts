import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PrimaryInputComponent } from '../../primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../../services/Post/post-service.service';
import { TemaService } from '../../../services/Tema/tema.service';
import { TemaResponse } from '../../../types/tema-response.type';

interface PostForm{
  titulo : FormControl,
  tema : FormControl,
  texto : FormControl
}

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

  postForm!: FormGroup<PostForm>
  temas: TemaResponse[] = []

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

  ngOnInit(): void {
      this.getNameTema()
  }

  submit(){
    this.postService.newPost(this.postForm.value.titulo, this.postForm.value.tema, this.postForm.value.texto).subscribe({
      next: () => {this.toastService.success("Post Realizado")
        this.closeForm.emit()
      },
      error: () => this.toastService.error("Erro inesperado tente novamente mais tarde")
    })
  }

  getNameTema(){
    this.temaService.getAllTemas().subscribe({
      next: (temas) => {this.temas = temas},
      error: () => this.toastService.error("Erro inesperado tente novamente mais tarde")
    })
  }
  
}
