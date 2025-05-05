import { Component, Input } from '@angular/core';
import { PostService } from '../../../services/Post/post-service.service';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from '../../../types/post-resonse.type';
import { EditPostComponent } from '../../forms/edit-post/edit-post.component';

@Component({
  selector: 'app-meu-perfil-comp',
  imports: [
    EditPostComponent
  ],
  templateUrl: './meu-perfil-comp.component.html',
  styleUrl: './meu-perfil-comp.component.css'
})
export class MeuPerfilCompComponent {

  userPosts: PostResponse[] = []
  mostrarFormulario = false
  postSelecionado!: PostResponse;

    @Input() name : string = sessionStorage.getItem("nome") ?? ""
    @Input() username : string = sessionStorage.getItem("username") ?? ""

        constructor(
          private postService : PostService,
          private toastService : ToastrService
        ){}

    ngOnInit(): void {
      this.getAllPostUser()
    }

    numeroPosts(): number{
      return this.userPosts.length
    }

    getAllPostUser(){
      this.postService.getPostsByUser().subscribe({
        next: (posts)  => {this.userPosts = posts},
        error: () => this.toastService.error("Erro inesperado ao carregar temas tente novamente mais tarde")
      })
    }

    deletePost(id : number){
      console.log("Deletar")
      this.postService.delete(id).subscribe({
        next : () => {
          this.userPosts = this.userPosts.filter(post => post.id !== id);
          this.toastService.success("Post Apagado com sucesso")},
        error: () => this.toastService.error("Erro ao apagar post tente novamente mais tarde")
      })
    }

    onFormularioClick(post: PostResponse){
      console.log("Abrir edição")
      this.mostrarFormulario = !this.mostrarFormulario
      this.postSelecionado = post;
    }



}
