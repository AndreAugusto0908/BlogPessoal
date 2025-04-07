package com.example.BackBlogPessoal.Models.DTOs.Auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
        @NotBlank(message = "O nome é obrigatório")
        @Size(min = 3, message = "O nome deve ter no minimo 3 caracteres")
        String nome,

        @NotBlank(message = "O usuário é obrigatório")
        @Size(min = 4, max = 30, message = "O usuário deve ter entre 4 e 30 caracteres")
        String usuario,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 4, max = 30, message = "O usuário deve ter entre 4 e 30 caracteres")
        String senha
) {
}
