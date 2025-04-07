package com.example.backblogpessoal.utils;

import com.example.backblogpessoal.models.post.Tema;
import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.TemaRepository;
import com.example.backblogpessoal.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostValidationTest {

    @InjectMocks
    private PostValidation postValidation;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TemaRepository temaRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveRetornarUsuarioQuandoEncontrado() {
        String email = "teste@email.com";
        User user = new User();
        user.setUsuario(email);

        when(userRepository.findByUsuario(email)).thenReturn(user);

        User result = postValidation.verificarUsuario(email);

        assertNotNull(result);
        assertEquals(email, result.getUsuario());
    }

    @Test
    void deveLancarExcecaoQuandoUsuarioNaoEncontrado() {
        when(userRepository.findByUsuario("nao@existe.com")).thenReturn(null);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> postValidation.verificarUsuario("nao@existe.com"));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Usuário não encontrado", ex.getReason());
    }

    @Test
    void deveRetornarTemaQuandoEncontrado() {
        String descricao = "Saúde";
        Tema tema = new Tema(descricao);

        when(temaRepository.findByDescricao(descricao)).thenReturn(tema);

        Tema result = postValidation.verificarTema(descricao);

        assertNotNull(result);
        assertEquals(descricao, result.getDescricao());
    }

    @Test
    void deveLancarExcecaoQuandoTemaNaoEncontrado() {
        when(temaRepository.findByDescricao("Inexistente")).thenReturn(null);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> postValidation.verificarTema("Inexistente"));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Tema não encontrado", ex.getReason());
    }
}
