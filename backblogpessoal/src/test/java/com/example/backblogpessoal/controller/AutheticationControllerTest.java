package com.example.backblogpessoal.controller;

import com.example.backblogpessoal.infra.security.TokenService;
import com.example.backblogpessoal.models.dtos.auth.AuthenticationDTO;
import com.example.backblogpessoal.models.dtos.auth.LoginResponseDTO;
import com.example.backblogpessoal.models.dtos.auth.RegisterDTO;
import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.util.UriComponentsBuilder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AutheticationControllerTest {

    @InjectMocks
    private AutheticationController controller;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository repository;

    @Mock
    private TokenService tokenService;

    private static final String EMAIL = "user@email.com";
    private static final String SENHA = "123456";
    private static final String TOKEN = "fake.jwt.token";

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setUsuario(EMAIL);
        user.setSenha(SENHA);
        user.setId(1L);
    }

    @Test
    void deveRetornarTokenQuandoLoginForValido() {
        AuthenticationDTO dto = new AuthenticationDTO(EMAIL, SENHA);
        Authentication auth = mock(Authentication.class);

        when(authenticationManager.authenticate(any())).thenReturn(auth);
        when(auth.getPrincipal()).thenReturn(user);
        when(tokenService.generateToken(user)).thenReturn(TOKEN);

        ResponseEntity response = controller.login(dto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        LoginResponseDTO body = (LoginResponseDTO) response.getBody();
        assertNotNull(body);
        assertEquals(TOKEN, body.token());
    }

    @Test
    void deveRetornarBadRequestSeUsuarioJaExiste() {
        RegisterDTO dto = new RegisterDTO("Usuário", EMAIL, SENHA);
        when(repository.findByUsuario(EMAIL)).thenReturn(new User());

        ResponseEntity<User> response = controller.register(dto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
