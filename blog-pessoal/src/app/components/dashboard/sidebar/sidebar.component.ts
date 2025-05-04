import { Component, Input, OnInit } from '@angular/core';
import { ButtonSidebarComponent } from '../components/button-sidebar/button-sidebar.component';
import { PostService } from '../../../services/Post/post-service.service';
import { PostResponse } from '../../../types/post-resonse.type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  imports: [
    ButtonSidebarComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  userPosts: PostResponse[] = []

    @Input() smallName : string = "LG"
    @Input() name : string = sessionStorage.getItem("nome") ?? ""
    @Input() username : string = sessionStorage.getItem("username") ?? ""

    constructor(
      private toastService : ToastrService,
      private postService : PostService
    ){}

    ngOnInit(): void {
      this.getAllPostUser()
    }

    getAllPostUser(){
      this.postService.getPostsByUser().subscribe({
        next: (posts)  => {this.userPosts = posts},
        error: () => this.toastService.error("Erro inesperado ao carregar temas tente novamente mais tarde")
      })
    }
}

