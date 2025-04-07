package com.example.backblogpessoal.service;

import com.example.backblogpessoal.models.dtos.user.EditarUserDTO;
import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;


    public User editarUser(Long id ,EditarUserDTO data) {
        User user = repository.findById(id);
        if (user == null) {throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");}

        User userExist = (User)repository.findByUsuario(data.usuario());

        if (userExist != null) {throw new ResponseStatusException(HttpStatus.CONFLICT, "Nome de usuário já está em uso.");}


        if (data.nome() != null) user.setNome(data.nome());
        if (data.usuario() != null) user.setUsuario(data.usuario());
        if (data.senha() != null) user.setSenha(new BCryptPasswordEncoder().encode(data.senha()));
        if (data.foto() != null) user.setFoto(data.foto());

        repository.save(user);
        return user;
    }

    public void excluirUser(Long id) {
        User user = repository.findById(id);
        repository.delete(user);
    }

}
