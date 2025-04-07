package com.example.BackBlogPessoal.Controller;

import com.example.BackBlogPessoal.Infra.Security.SecurityConfigurations;
import com.example.BackBlogPessoal.Models.DTOs.Post.CriarPostDTO;
import com.example.BackBlogPessoal.Models.DTOs.Post.EditarPostDTO;
import com.example.BackBlogPessoal.Models.DTOs.Post.PostResponse;
import com.example.BackBlogPessoal.Models.Post.Post;
import com.example.BackBlogPessoal.Service.PostService;
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
@RequestMapping("api/postagens")
@Tag(name = "Postagens", description = "Controlador para gerenciar as postagens no sistema")
@SecurityRequirement(name = SecurityConfigurations.SECURITY)
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    @Operation(summary = "Criar uma nova postagem", description = "Método para criar uma nova postagem no sistema")
    @ApiResponse(responseCode = "201", description = "Postagem criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Erro de validação ou dados inválidos")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity<PostResponse> criarPost(@RequestBody @Valid CriarPostDTO data){
        PostResponse post = postService.criarPost(data);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(post.id())
                .toUri();

        return ResponseEntity.created(location).body(post);
    }

    @GetMapping
    @Operation(summary = "Listar todas as postagens", description = "Retorna uma lista com todas as postagens do sistema")
    @ApiResponse(responseCode = "200", description = "Lista de postagens retornada com sucesso")
    @ApiResponse(responseCode = "204", description = "Nenhuma postagem encontrada")
    public ResponseEntity<List<PostResponse>> getAllPosts(){
        List<PostResponse> todosPosts = postService.getAllPosts();
        if (todosPosts.isEmpty()){return ResponseEntity.noContent().build();}
        return ResponseEntity.ok(todosPosts);
    }

    @GetMapping("/filtro")
    @Operation(summary = "Filtrar postagens", description = "Filtra as postagens por autor ou tema")
    @ApiResponse(responseCode = "200", description = "Postagens filtradas retornadas com sucesso")
    public ResponseEntity<List<PostResponse>> filtrar(@RequestParam(required = false) Long autor, @RequestParam(required = false) Long tema) {
        List<PostResponse> postsBuscados = postService.buscarPosts(autor, tema);
        return ResponseEntity.ok(postsBuscados);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar uma postagem", description = "Edita os dados de uma postagem existente")
    @ApiResponse(responseCode = "200", description = "Postagem editada com sucesso")
    @ApiResponse(responseCode = "404", description = "Postagem não encontrada")
    public ResponseEntity<PostResponse> editarPost(@PathVariable Long id, @RequestBody @Valid EditarPostDTO data){
        PostResponse post = postService.editarPost(data, id);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar uma postagem", description = "Remove uma postagem do sistema")
    @ApiResponse(responseCode = "204", description = "Postagem removida com sucesso")
    @ApiResponse(responseCode = "404", description = "Postagem não encontrada")
    public ResponseEntity deletarPost(@PathVariable Long id){
        postService.excluirPost(id);
        return ResponseEntity.noContent().build();
    }

}
