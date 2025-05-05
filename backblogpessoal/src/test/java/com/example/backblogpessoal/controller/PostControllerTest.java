package com.example.backblogpessoal.controller;

import com.example.backblogpessoal.infra.security.SecurityConfigurations;
import com.example.backblogpessoal.infra.security.TokenService;
import com.example.backblogpessoal.models.dtos.post.CriarPostDTO;
import com.example.backblogpessoal.models.dtos.post.EditarPostDTO;
import com.example.backblogpessoal.models.dtos.post.PostResponse;
import com.example.backblogpessoal.repository.UserRepository;
import com.example.backblogpessoal.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PostController.class)
@AutoConfigureMockMvc
@Import(SecurityConfigurations.class)
class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TokenService tokenService;

    @MockitoBean
    private PostService postService;

    @MockitoBean
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private static final Long ID = 1L;
    private static final String TITULO = "Postagem de Teste";
    private static final String TEXTO = "Conteúdo da postagem.";
    private static final String USUARIO = "joao";
    private static final String TEMA = "Tecnologia";

    private final PostResponse postResponse = new PostResponse(ID, TITULO, TEXTO, "12/04", USUARIO, TEMA, "Andre");

    @Test
    @WithMockUser
    void deveCriarPostComSucesso() throws Exception {
        CriarPostDTO dto = new CriarPostDTO(TITULO, TEXTO, USUARIO, TEMA);

        when(postService.criarPost(dto)).thenReturn(postResponse);

        mockMvc.perform(post("/api/postagens")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value(TITULO));
    }

    @Test
    @WithMockUser
    void deveListarTodosOsPosts() throws Exception {
        when(postService.getAllPosts()).thenReturn(List.of(postResponse));

        mockMvc.perform(get("/api/postagens"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titulo").value(TITULO));
    }

    @Test
    @WithMockUser
    void deveRetornarNoContentSeNaoHouverPosts() throws Exception {
        when(postService.getAllPosts()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/postagens"))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser
    void deveFiltrarPostsPorUsuarioETema() throws Exception {
        when(postService.buscarPosts(ID, ID)).thenReturn(List.of(postResponse));

        mockMvc.perform(get("/api/postagens/filtro")
                        .param("autor", ID.toString())
                        .param("tema", ID.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titulo").value(TITULO));
    }

    @Test
    @WithMockUser
    void deveEditarPostComSucesso() throws Exception {
        EditarPostDTO dto = new EditarPostDTO("Novo Título", TEXTO, TEMA);

        when(postService.editarPost(dto, ID)).thenReturn(postResponse);

        mockMvc.perform(put("/api/postagens/{id}", ID)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value(TITULO));
    }

    @Test
    @WithMockUser
    void deveDeletarPostComSucesso() throws Exception {
        doReturn(postResponse).when(postService).excluirPost(ID);

        mockMvc.perform(delete("/api/postagens/{id}", ID)
                        .with(csrf()))
                .andExpect(status().isNoContent());
    }
}
