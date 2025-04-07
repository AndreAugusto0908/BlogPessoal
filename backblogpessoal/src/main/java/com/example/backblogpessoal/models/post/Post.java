package com.example.backblogpessoal.models.post;

import com.example.backblogpessoal.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Table(name = "tb_post")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false)
    private String texto;

    @Column(nullable = false)
    private Date data;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "tema_id")
    private Tema tema;

    public Post(String titulo, String texto, User usuario, Tema tema) {
        this.titulo = titulo;
        this.texto = texto;
        this.usuario = usuario;
        this.tema = tema;
        this.data = new Date();
    }

}
