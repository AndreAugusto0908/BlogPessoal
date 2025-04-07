package com.example.BackBlogPessoal.Controller;

import com.example.BackBlogPessoal.Infra.Security.SecurityConfigurations;
import com.example.BackBlogPessoal.Models.DTOs.User.EditarUserDTO;
import com.example.BackBlogPessoal.Models.User.User;
import com.example.BackBlogPessoal.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/usuarios")
@Tag(name = "Usuários", description = "Controlador para gerenciamento de usuários")
@SecurityRequirement(name = SecurityConfigurations.SECURITY)
public class UserController {

    @Autowired
    private UserService service;

    @PutMapping("/{id}")
    @Operation(summary = "Editar um usuário", description = "Edita as informações de um usuário existente")
    @ApiResponse(responseCode = "200", description = "Usuário editado com sucesso")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @ApiResponse(responseCode = "409", description = "Nome de usuário já está em uso")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity editarUser(@PathVariable Long id, @RequestBody EditarUserDTO data) {
        User usuarioEditado = service.editarUser(id, data);
        return ResponseEntity.ok().body(usuarioEditado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir um usuário", description = "Remove um usuário do sistema pelo ID")
    @ApiResponse(responseCode = "204", description = "Usuário excluído com sucesso")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        service.excluirUser(id);
        return ResponseEntity.noContent().build();
    }

}
