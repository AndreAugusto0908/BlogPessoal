import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from '../../../types/post-resonse.type';
import { PostService } from '../../../services/Post/post-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feed',
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  allPosts: PostResponse[] = []

    constructor(
      private postService : PostService,
      private toastService : ToastrService
    ){}

    ngOnInit(): void {
      this.getAllPost();
    }

    getAllPost(){
      this.postService.getAllPosts().subscribe({
        next: (posts)  => {this.allPosts = posts},
        error: () => this.toastService.error("Erro inesperado ao carregar Posts tente novamente mais tarde")
      })
    }

}
