package com.example.backblogpessoal.models.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthenticationDTO(

        @NotBlank(message = "O usuário é obrigatório")
        @Size(min = 4, max = 30, message = "O usuário deve ter entre 4 e 30 caracteres")
        String usuario,

        @NotBlank(message = "A senha é obrigatoria")
        @Size(min = 4, max = 30, message = "A senha deve ter entre 4 e 30 caracteres")
        String senha
) {
}
