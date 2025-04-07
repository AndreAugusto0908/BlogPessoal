package com.example.BackBlogPessoal.Models.DTOs.Post;

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
