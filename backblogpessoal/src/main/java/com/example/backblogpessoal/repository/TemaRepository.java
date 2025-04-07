package com.example.backblogpessoal.repository;

import com.example.backblogpessoal.models.post.Tema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemaRepository extends JpaRepository<Tema, Integer> {

    Tema findByDescricao(String descricao);
    Tema findById(Long id);

}
