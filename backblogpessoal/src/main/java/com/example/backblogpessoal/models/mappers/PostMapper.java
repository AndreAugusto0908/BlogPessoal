package com.example.backblogpessoal.models.mappers;

import com.example.backblogpessoal.models.dtos.post.PostResponse;
import com.example.backblogpessoal.models.post.Post;
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