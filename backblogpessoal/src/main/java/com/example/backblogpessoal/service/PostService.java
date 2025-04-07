package com.example.backblogpessoal.service;

import com.example.backblogpessoal.models.dtos.post.CriarPostDTO;
import com.example.backblogpessoal.models.dtos.post.EditarPostDTO;
import com.example.backblogpessoal.models.dtos.post.PostResponse;
import com.example.backblogpessoal.models.mappers.PostMapper;
import com.example.backblogpessoal.models.post.Post;
import com.example.backblogpessoal.models.post.Tema;
import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.PostRepository;
import com.example.backblogpessoal.repository.UserRepository;
import com.example.backblogpessoal.utils.PostValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostValidation postValidation;

    @Autowired
    private UserRepository userRepository;

    public PostResponse criarPost(CriarPostDTO data) {
        User user = postValidation.verificarUsuario(data.usuario());
        Tema tema = postValidation.verificarTema(data.tema());
        Post post = new Post(data.titulo(), data.texto(), user, tema);

        user.adicionarPost(post);
        userRepository.save(user);
        postRepository.save(post);

        return postMapper.toResponse(post);
    }

    public List<PostResponse> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(postMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<PostResponse> buscarPosts(Long usuarioId, Long temaId) {
        List<Post> posts;

        if (usuarioId != null && temaId != null) {
            posts = postRepository.findAllByUsuarioIdAndTemaId(usuarioId, temaId);
        } else if (usuarioId != null) {
            posts = postRepository.findAllByUsuarioId(usuarioId);
        } else if (temaId != null) {
            posts = postRepository.findAllByTemaId(temaId);
        } else {
            posts = postRepository.findAll();
        }

        return postMapper.toResponseList(posts);
    }

    public PostResponse editarPost(EditarPostDTO data, long id){
        Post postExists = postRepository.findById(id);
        if(postExists == null){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse ID de Post não existe.");}

        if (data.titulo() != null) {postExists.setTitulo(data.titulo());}
        if (data.texto() != null) {postExists.setTexto(data.texto());}

        if (data.tema() != null) {
            Tema temaExists = postValidation.verificarTema(data.tema());
            postExists.setTema(temaExists);
        }

        postRepository.save(postExists);

        return postMapper.toResponse(postExists);
    }

    public PostResponse excluirPost(long id){
        Post postExists = postRepository.findById(id);
        if(postExists == null){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse ID de Post não existe.");}
        postRepository.delete(postExists);
        return postMapper.toResponse(postExists);
    }



}
