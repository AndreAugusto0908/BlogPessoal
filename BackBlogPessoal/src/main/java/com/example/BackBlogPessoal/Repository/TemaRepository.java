package com.example.BackBlogPessoal.Repository;

import com.example.BackBlogPessoal.Models.Post.Tema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemaRepository extends JpaRepository<Tema, Integer> {

    Tema findByDescricao(String descricao);
    Tema findById(Long id);

}
