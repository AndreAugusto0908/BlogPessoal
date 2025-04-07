package com.example.backblogpessoal.models.dtos.user;

public record EditarUserDTO(
        String nome,
        String usuario,
        String senha,
        String foto
) {
}
