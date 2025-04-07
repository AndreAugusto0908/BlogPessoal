package com.example.backblogpessoal.service;

import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthorizationServiceTest {

    @InjectMocks
    private AuthorizationService authorizationService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveRetornarUserDetailsQuandoUsuarioExiste() {
        String email = "teste@email.com";
        User usuarioMock = new User();
        usuarioMock.setUsuario(email);

        when(userRepository.findByUsuario(email)).thenReturn(usuarioMock);

        UserDetails result = authorizationService.loadUserByUsername(email);

        assertNotNull(result);
        assertEquals(email, result.getUsername());
        verify(userRepository, times(1)).findByUsuario(email);
    }
}

