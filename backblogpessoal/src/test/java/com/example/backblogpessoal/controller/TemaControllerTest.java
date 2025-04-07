package com.example.backblogpessoal.controller;

import com.example.backblogpessoal.infra.config.TestSecurityConfig;
import com.example.backblogpessoal.infra.security.TokenService;
import com.example.backblogpessoal.models.dtos.post.CriarTemaDTO;
import com.example.backblogpessoal.models.post.Tema;
import com.example.backblogpessoal.repository.UserRepository;
import com.example.backblogpessoal.service.TemaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TemaController.class)
@AutoConfigureMockMvc
@WithMockUser(username = "testUser", roles = "USER")
class TemaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TokenService tokenService;

    @MockitoBean
    private TemaService temaService;

    @MockitoBean
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private static final Long ID = 1L;
    private static final String DESCRICAO = "Tecnologia";

    @Test
    void deveCriarTemaComSucesso() throws Exception {
        CriarTemaDTO dto = new CriarTemaDTO(DESCRICAO);
        Tema tema = new Tema(DESCRICAO);
        tema.setId(ID);

        when(temaService.criarTema(dto)).thenReturn(tema);

        mockMvc.perform(post("/api/temas")
                        .with(csrf()) // <- AQUI
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.descricao").value(DESCRICAO));
    }

    @Test
    void deveEditarTemaComSucesso() throws Exception {
        CriarTemaDTO dto = new CriarTemaDTO("Atualizado");
        Tema temaAtualizado = new Tema("Atualizado");
        temaAtualizado.setId(ID);

        when(temaService.editarTema(ID, dto)).thenReturn(temaAtualizado);

        mockMvc.perform(put("/api/temas/{id}", ID)
                        .with(csrf()) // <- AQUI
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.descricao").value("Atualizado"));
    }

    @Test
    void deveDeletarTemaComSucesso() throws Exception {
        doNothing().when(temaService).excluirTema(ID);

        mockMvc.perform(delete("/api/temas/{id}", ID)
                        .with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    void deveListarTemasComSucesso() throws Exception {
        Tema tema = new Tema(DESCRICAO);
        tema.setId(ID);

        when(temaService.listarTemas()).thenReturn(List.of(tema));

        mockMvc.perform(get("/api/temas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].descricao").value(DESCRICAO));
    }
}