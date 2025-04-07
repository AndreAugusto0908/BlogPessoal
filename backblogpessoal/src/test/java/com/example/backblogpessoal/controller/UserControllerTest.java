package com.example.backblogpessoal.controller;

import com.example.backblogpessoal.infra.security.TokenService;
import com.example.backblogpessoal.models.dtos.user.EditarUserDTO;
import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.UserRepository;
import com.example.backblogpessoal.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private TokenService tokenService;

    @MockitoBean
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private static final Long USER_ID = 1L;
    private static final String NOVO_NOME = "Novo Nome";
    private static final String NOVO_USUARIO = "novousuario";
    private static final String NOVA_SENHA = "senha123";
    private static final String NOVA_FOTO = "http://foto.com/perfil.png";

    @Test
    @WithMockUser(username = "testUser", roles = "USER")
    void deveEditarUsuarioComSucesso() throws Exception {
        EditarUserDTO editarDto = new EditarUserDTO(NOVO_NOME, NOVO_USUARIO, NOVA_SENHA, NOVA_FOTO);

        User usuarioEditado = new User();
        usuarioEditado.setId(USER_ID);
        usuarioEditado.setNome(NOVO_NOME);
        usuarioEditado.setUsuario(NOVO_USUARIO);
        usuarioEditado.setSenha(NOVA_SENHA);
        usuarioEditado.setFoto(NOVA_FOTO);

        when(userService.editarUser(USER_ID, editarDto)).thenReturn(usuarioEditado);

        mockMvc.perform(put("/api/usuarios/{id}", USER_ID)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(editarDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value(NOVO_NOME))
                .andExpect(jsonPath("$.usuario").value(NOVO_USUARIO))
                .andExpect(jsonPath("$.senha").value(NOVA_SENHA))
                .andExpect(jsonPath("$.foto").value(NOVA_FOTO));
    }

    @Test
    @WithMockUser(username = "testUser", roles = "USER")
    void deveExcluirUsuarioComSucesso() throws Exception {
        doNothing().when(userService).excluirUser(USER_ID);

        mockMvc.perform(delete("/api/usuarios/{id}", USER_ID)
                        .with(csrf()))
                .andExpect(status().isNoContent());
    }
}
