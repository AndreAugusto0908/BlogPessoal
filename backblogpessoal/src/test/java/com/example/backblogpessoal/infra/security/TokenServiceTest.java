package com.example.backblogpessoal.infra.security;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.backblogpessoal.infra.exception.TokenGenerationException;
import com.example.backblogpessoal.models.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class TokenServiceTest {

    private TokenService tokenService;

    private static final String SECRET = "my-secret-key";

    @BeforeEach
    void setUp() {
        tokenService = new TokenService();
        ReflectionTestUtils.setField(tokenService, "secret", SECRET); // injeta a secret manualmente
    }

    @Test
    void deveGerarTokenComSucesso() {
        User user = new User();
        user.setUsuario("usuario@email.com");

        String token = tokenService.generateToken(user);

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void deveValidarTokenComSucesso() {
        User user = new User();
        user.setUsuario("valid@email.com");

        ReflectionTestUtils.setField(tokenService, "secret", SECRET);
        String token = tokenService.generateToken(user);

        String subject = tokenService.validateToken(token);

        assertEquals("valid@email.com", subject);
    }

    @Test
    void deveRetornarStringVaziaComTokenInvalido() {
        String tokenInvalido = "token.invalido.abc";

        String result = tokenService.validateToken(tokenInvalido);

        assertEquals("", result);
    }
}
