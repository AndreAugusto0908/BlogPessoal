package com.example.BackBlogPessoal.Repository;

import com.example.BackBlogPessoal.Models.Post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    Post findByTitulo(String titulo);
    Post findById(Long id);
    List<Post> findAllByUsuarioId(Long usuarioId);
    List<Post> findAllByTemaId(Long temaId);
    List<Post> findAllByUsuarioIdAndTemaId(Long usuarioId, Long temaId);

}
