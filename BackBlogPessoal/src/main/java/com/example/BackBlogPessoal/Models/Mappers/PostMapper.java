package com.example.BackBlogPessoal.Models.Mappers;

import com.example.BackBlogPessoal.Models.DTOs.Post.PostResponse;
import com.example.BackBlogPessoal.Models.Post.Post;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostMapper {

    public PostResponse toResponse(Post post) {
        if (post == null) return null;

        return new PostResponse(
                post.getId(),
                post.getTitulo(),
                post.getTexto(),
                post.getData(),
                post.getUsuario().getNome(),
                post.getTema().getDescricao()
        );
    }

    public List<PostResponse> toResponseList(List<Post> posts) {
        return posts.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}