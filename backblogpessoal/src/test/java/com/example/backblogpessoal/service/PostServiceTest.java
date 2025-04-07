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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceTest {

    @InjectMocks
    private PostService postService;

    @Mock
    private PostMapper postMapper;

    @Mock
    private PostRepository postRepository;

    @Mock
    private PostValidation postValidation;

    @Mock
    private UserRepository userRepository;

    private final String USUARIO = "usuario1";
    private final String TEMA = "tema1";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveCriarPostComSucesso() {
        CriarPostDTO dto = new CriarPostDTO("Titulo", "Texto", USUARIO, TEMA);
        User user = new User("Nome", USUARIO, "senha");
        user.setId(1L);
        user.setPosts(new ArrayList<>());
        Tema tema = new Tema(TEMA);
        tema.setId(1L);
        Post post = new Post("Titulo", "Texto", user, tema);

        PostResponse expected = new PostResponse(1L, "Titulo", "Texto", new Date(), USUARIO, TEMA);

        when(postValidation.verificarUsuario(USUARIO)).thenReturn(user);
        when(postValidation.verificarTema(TEMA)).thenReturn(tema);
        when(postRepository.save(any(Post.class))).thenReturn(post);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(postMapper.toResponse(any(Post.class))).thenReturn(expected);

        PostResponse result = postService.criarPost(dto);

        assertEquals(expected, result);
    }

    @Test
    void deveEditarPostComSucesso() {
        EditarPostDTO dto = new EditarPostDTO("Novo Titulo", "Novo Texto", TEMA);
        Tema tema = new Tema(TEMA);
        tema.setId(2L);
        User user = new User("Nome", USUARIO, "senha");
        Post post = new Post("Antigo", "Texto", user, new Tema("antigo"));
        post.setId(1L);

        when(postRepository.findById(1L)).thenReturn(post);
        when(postValidation.verificarTema(TEMA)).thenReturn(tema);
        when(postRepository.save(post)).thenReturn(post);
        when(postMapper.toResponse(post)).thenReturn(
                new PostResponse(1L, "Novo Titulo", "Novo Texto", new Date(), USUARIO, TEMA));

        PostResponse result = postService.editarPost(dto, 1L);

        assertEquals("Novo Titulo", result.titulo());
        assertEquals("Novo Texto", result.texto());
        assertEquals(TEMA, result.tema());
    }

    @Test
    void deveExcluirPostComSucesso() {
        User user = new User("Nome", USUARIO, "senha");
        Post post = new Post("Titulo", "Texto", user, new Tema(TEMA));
        post.setId(1L);

        when(postRepository.findById(1L)).thenReturn(post);
        when(postMapper.toResponse(post)).thenReturn(
                new PostResponse(1L, "Titulo", "Texto", new Date(), USUARIO, TEMA));

        PostResponse result = postService.excluirPost(1L);

        verify(postRepository).delete(post);
        assertEquals("Titulo", result.titulo());
    }

    @Test
    void deveBuscarTodosOsPosts() {
        Post post = new Post("Titulo", "Texto", new User("Nome", USUARIO, "senha"), new Tema(TEMA));
        post.setId(1L);
        List<Post> posts = List.of(post);

        when(postRepository.findAll()).thenReturn(posts);
        when(postMapper.toResponse(post)).thenReturn(
                new PostResponse(1L, "Titulo", "Texto", new Date(), USUARIO, TEMA));

        List<PostResponse> result = postService.getAllPosts();

        assertEquals(1, result.size());
    }

    @Test
    void deveBuscarPorUsuarioETema() {
        List<Post> posts = List.of(new Post("Titulo", "Texto", new User("Nome", USUARIO, "senha"), new Tema(TEMA)));

        when(postRepository.findAllByUsuarioIdAndTemaId(1L, 2L)).thenReturn(posts);
        when(postMapper.toResponseList(posts)).thenReturn(List.of(
                new PostResponse(1L, "Titulo", "Texto", new Date(), USUARIO, TEMA)));

        List<PostResponse> result = postService.buscarPosts(1L, 2L);

        assertEquals(1, result.size());
    }

    @Test
    void deveLancarExcecaoQuandoEditarPostInexistente() {
        when(postRepository.findById(1L)).thenReturn(null);

        assertThrows(ResponseStatusException.class, () ->
                postService.editarPost(new EditarPostDTO("a", "b", null), 1L));
    }

    @Test
    void deveLancarExcecaoQuandoExcluirPostInexistente() {
        when(postRepository.findById(1L)).thenReturn(null);

        assertThrows(ResponseStatusException.class, () ->
                postService.excluirPost(1L));
    }
}
