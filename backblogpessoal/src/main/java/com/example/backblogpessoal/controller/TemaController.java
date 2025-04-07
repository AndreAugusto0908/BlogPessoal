package com.example.backblogpessoal.controller;

import com.example.backblogpessoal.infra.security.SecurityConfigurations;
import com.example.backblogpessoal.models.dtos.post.CriarTemaDTO;
import com.example.backblogpessoal.models.post.Tema;
import com.example.backblogpessoal.service.TemaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/temas")
@Tag(name = "Temas", description = "Controlador para gerenciar os temas das postagens")
@SecurityRequirement(name = SecurityConfigurations.SECURITY)
public class TemaController {

    @Autowired
    private TemaService temaService;

    @PostMapping
    @Operation(summary = "Criar novo tema", description = "Cria um novo tema para postagens no sistema")
    @ApiResponse(responseCode = "201", description = "Tema criado com sucesso")
    @ApiResponse(responseCode = "409", description = "Tema já existe")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<Tema> criarTema(@RequestBody @Valid CriarTemaDTO data){
        Tema tema = temaService.criarTema(data);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(tema.getId())
                .toUri();

        return ResponseEntity.created(location).body(tema);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar tema existente", description = "Edita a descrição de um tema já cadastrado")
    @ApiResponse(responseCode = "200", description = "Tema editado com sucesso")
    @ApiResponse(responseCode = "404", description = "Tema não encontrado")
    @ApiResponse(responseCode = "409", description = "Descrição de tema já existente")
    public ResponseEntity<Tema> editarTema(@PathVariable Long id, @RequestBody @Valid CriarTemaDTO data){
        Tema tema = temaService.editarTema(id, data);
        return ResponseEntity.ok(tema);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um tema", description = "Remove um tema do sistema pelo ID")
    @ApiResponse(responseCode = "204", description = "Tema removido com sucesso")
    @ApiResponse(responseCode = "404", description = "Tema não encontrado")
    public ResponseEntity deletarTema(@PathVariable Long id){
        temaService.excluirTema(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @Operation(summary = "Listar todos os temas", description = "Retorna uma lista com todos os temas disponíveis")
    @ApiResponse(responseCode = "200", description = "Lista de temas retornada com sucesso")
    @ApiResponse(responseCode = "404", description = "Nenhum tema encontrado")
    public ResponseEntity<List<Tema>> listarTemas(){
        List<Tema> temas = temaService.listarTemas();
        return ResponseEntity.ok(temas);
    }

}
