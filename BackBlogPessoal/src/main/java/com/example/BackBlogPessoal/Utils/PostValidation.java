package com.example.BackBlogPessoal.Utils;

import com.example.BackBlogPessoal.Models.Post.Tema;
import com.example.BackBlogPessoal.Models.User.User;
import com.example.BackBlogPessoal.Repository.TemaRepository;
import com.example.BackBlogPessoal.Repository.UserRepository;
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
