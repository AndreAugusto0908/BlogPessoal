package com.example.backblogpessoal.models.dtos.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CriarPostDTO(
        @NotBlank(message = "O post deve ter um titulo")
        @Size(max = 40, message = "O Titulo deve ter até 40 caracteres")
        String titulo,

        @NotBlank(message = "O post deve ter um texto")
        String texto,

        @NotBlank(message = "O post deve ter um usuario")
        String usuario,

        @NotBlank(message = "Post deve ter um tema")
        String tema
) {
}
