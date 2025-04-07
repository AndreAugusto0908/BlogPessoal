package com.example.backblogpessoal.models.dtos.post;

import jakarta.validation.constraints.NotBlank;

public record CriarTemaDTO(
        @NotBlank(message = "O tema deve ter uma descricao")
        String descricao
) {
}
