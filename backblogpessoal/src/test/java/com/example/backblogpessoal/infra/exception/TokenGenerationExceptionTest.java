package com.example.backblogpessoal.infra.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TokenGenerationExceptionTest {

    @Test
    void deveCriarExcecaoComMensagemPadraoECausa() {
        // Arrange
        Throwable causa = new RuntimeException("Erro interno do JWT");

        // Act
        TokenGenerationException exception = new TokenGenerationException(causa);

        // Assert
        assertEquals("Erro ao gerar token JWT", exception.getMessage());
        assertEquals(causa, exception.getCause());
    }
}
