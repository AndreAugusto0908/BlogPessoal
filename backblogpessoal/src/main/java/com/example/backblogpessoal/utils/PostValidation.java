package com.example.backblogpessoal.utils;

import com.example.backblogpessoal.models.post.Tema;
import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.TemaRepository;
import com.example.backblogpessoal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class PostValidation {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TemaRepository temaRepository;

    public User verificarUsuario(String usuario){
        User userExists = (User) userRepository.findByUsuario(usuario);
        if(userExists == null){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");}
        return userExists;
    }

    public Tema verificarTema(String descricao){
        Tema temaExists = temaRepository.findByDescricao(descricao);
        if (temaExists == null){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tema não encontrado");}
        return temaExists;
    }

}
