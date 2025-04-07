package com.example.backblogpessoal.infra.exception;

public class TokenGenerationException extends RuntimeException {
  public TokenGenerationException(Throwable cause) {
    super("Erro ao gerar token JWT", cause);
  }
}
