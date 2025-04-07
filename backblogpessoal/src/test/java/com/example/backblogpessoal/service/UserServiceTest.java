package com.example.backblogpessoal.service;

import com.example.backblogpessoal.models.dtos.user.EditarUserDTO;
import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository repository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveEditarUsuarioComSucesso() {
        Long id = 1L;
        User user = new User();
        user.setId(id);
        user.setUsuario("antigo@email.com");

        EditarUserDTO dto = new EditarUserDTO("Novo Nome", "novo@email.com", "123456", "url");

        when(repository.findById(id)).thenReturn(user);
        when(repository.findByUsuario(dto.usuario())).thenReturn(null);
        when(repository.save(any(User.class))).thenReturn(user);

        User result = userService.editarUser(id, dto);

        assertNotNull(result);
        assertEquals("Novo Nome", result.getNome());
        assertEquals("novo@email.com", result.getUsuario());
        assertNotNull(result.getSenha());
        assertEquals("url", result.getFoto());
        verify(repository).save(user);
    }

    @Test
    void deveLancarNotFoundQuandoUsuarioNaoExiste() {
        Long id = 99L;
        when(repository.findById(id)).thenReturn(null);

        EditarUserDTO dto = new EditarUserDTO("Nome", "usuario@email.com", "123", "foto");

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
            userService.editarUser(id, dto)
        );

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    @Test
    void deveLancarConflictQuandoUsuarioJaExiste() {
        Long id = 1L;
        User user = new User();
        user.setId(id);

        EditarUserDTO dto = new EditarUserDTO("Nome", "usuario@email.com", "123", "foto");

        when(repository.findById(id)).thenReturn(user);
        when(repository.findByUsuario(dto.usuario())).thenReturn(new User());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
            userService.editarUser(id, dto)
        );

        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());
    }

    @Test
    void deveExcluirUsuarioComSucesso() {
        Long id = 1L;
        User user = new User();
        user.setId(id);

        when(repository.findById(id)).thenReturn(user);

        userService.excluirUser(id);
        verify(repository).delete(user);
    }
}
