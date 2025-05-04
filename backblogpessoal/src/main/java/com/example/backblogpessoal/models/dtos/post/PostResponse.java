package com.example.backblogpessoal.models.dtos.post;

import java.util.Date;

public record PostResponse(
        Long id,
        String titulo,
        String texto,
        String data,
        String usuario,
        String tema,
        String nome
) {
}
