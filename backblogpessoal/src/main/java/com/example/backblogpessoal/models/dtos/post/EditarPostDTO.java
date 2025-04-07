package com.example.backblogpessoal.models.dtos.post;

import jakarta.validation.constraints.Size;

public record EditarPostDTO(

        @Size(max = 40, message = "O Titulo deve ter até 40 caracteres")
        String titulo,

        String texto,

        String tema
) {
}
