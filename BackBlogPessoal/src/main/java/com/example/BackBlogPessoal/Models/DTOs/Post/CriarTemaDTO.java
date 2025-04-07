package com.example.BackBlogPessoal.Models.DTOs.Post;

import jakarta.validation.constraints.NotBlank;

public record CriarTemaDTO(
        @NotBlank(message = "O tema deve ter uma descricao")
        String descricao
) {
}
