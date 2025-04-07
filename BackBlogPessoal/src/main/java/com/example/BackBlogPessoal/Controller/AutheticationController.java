package com.example.BackBlogPessoal.Controller;

import com.example.BackBlogPessoal.Infra.Security.SecurityConfigurations;
import com.example.BackBlogPessoal.Infra.Security.TokenService;
import com.example.BackBlogPessoal.Models.DTOs.Auth.AuthenticationDTO;
import com.example.BackBlogPessoal.Models.DTOs.Auth.LoginResponseDTO;
import com.example.BackBlogPessoal.Models.DTOs.Auth.RegisterDTO;
import com.example.BackBlogPessoal.Models.User.User;
import com.example.BackBlogPessoal.Repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/usuarios")
@Tag(name = "Auth", description = "Controlador para Criar e Authenticar usuarios no sistema")
@SecurityRequirement(name = SecurityConfigurations.SECURITY)
public class AutheticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    @Operation(summary = "Realiza o login de um Usuario", description = "Método para relizar login de um Usuario")
    @ApiResponse(responseCode = "200", description = "Login Realizado com sucesso")
    @ApiResponse(responseCode = "403", description = "Credenciais invalidas")
    @ApiResponse(responseCode = "500", description = "Erro no servidor")
    public ResponseEntity login(@RequestBody AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.usuario(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }


    @PostMapping()
    @Operation(summary = "Realiza o cadastro de um Usuario", description = "Método para relizar o cadastro de um Usuario")
    @ApiResponse(responseCode = "201", description = "Cadastro Realizado com sucesso")
    @ApiResponse(responseCode = "400", description = "Usuario já cadastrado")
    @ApiResponse(responseCode = "500", description = "Erro no servidor")
    public ResponseEntity<User> register(@RequestBody @Valid RegisterDTO data) {
        if (this.repository.findByUsuario(data.usuario()) != null) {return ResponseEntity.badRequest().build();}

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        User newUser = new User(data.nome(), data.usuario(), encryptedPassword);

        this.repository.save(newUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newUser.getId())
                .toUri();

        return ResponseEntity.created(location).body(newUser);
    }



}
