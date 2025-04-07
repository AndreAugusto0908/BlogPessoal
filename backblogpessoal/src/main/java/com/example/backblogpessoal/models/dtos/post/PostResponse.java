package com.example.backblogpessoal.models.dtos.post;

import java.util.Date;

public record PostResponse(
        Long id,
        String titulo,
        String texto,
        Date data,
        String usuario,
        String tema
) {
}
