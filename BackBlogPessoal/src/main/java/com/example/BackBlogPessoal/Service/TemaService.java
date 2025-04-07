package com.example.BackBlogPessoal.Service;

import com.example.BackBlogPessoal.Models.DTOs.Post.CriarTemaDTO;
import com.example.BackBlogPessoal.Models.Post.Tema;
import com.example.BackBlogPessoal.Repository.TemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TemaService {

    @Autowired
    private TemaRepository temaRepository;

    public Tema criarTema(CriarTemaDTO data){
        Tema temaExists = temaRepository.findByDescricao(data.descricao());
        if(temaExists != null){throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse tema já existe.");}

        Tema tema = new Tema(data.descricao());
        temaRepository.save(tema);
        return tema;
    }

    public Tema editarTema(Long id, CriarTemaDTO data){
        Tema temaExists = temaRepository.findById(id);
        if (temaExists == null) {throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse ID de tema não existe.");}

        Tema temaConteudoExists = temaRepository.findByDescricao(data.descricao());
        if (temaConteudoExists == null){throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse tema já existe.");}

        temaExists.setDescricao(data.descricao());
        temaRepository.save(temaExists);
        return temaExists;
    }

    public Tema excluirTema(Long id){
        Tema temaExists = temaRepository.findById(id);
        if (temaExists == null) {throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse ID de tema não existe.");}
        temaRepository.delete(temaExists);
        return temaExists;

    }

    public List<Tema> listarTemas(){
        List<Tema> temas = temaRepository.findAll();
        if(temas.size() == 0){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Não existe nenhum tema criado.");}
        return temas;
    }

}
