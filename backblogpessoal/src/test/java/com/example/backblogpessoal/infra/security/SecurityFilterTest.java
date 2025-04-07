package com.example.backblogpessoal.infra.security;

import com.example.backblogpessoal.models.user.User;
import com.example.backblogpessoal.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SecurityFilterTest {

    @InjectMocks
    private SecurityFilter securityFilter;

    @Mock
    private TokenService tokenService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    private static final String TOKEN = "valid.token.jwt";
    private static final String USERNAME = "usuario@email.com";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.clearContext();
    }

    @Test
    void deveAutenticarUsuarioQuandoTokenValido() throws IOException, jakarta.servlet.ServletException {
        when(request.getHeader("Authorization")).thenReturn("Bearer " + TOKEN);
        when(tokenService.validateToken(TOKEN)).thenReturn(USERNAME);

        User userMock = new User();
        userMock.setUsuario(USERNAME);
        when(userRepository.findByUsuario(USERNAME)).thenReturn(userMock);

        securityFilter.doFilterInternal(request, response, filterChain);

        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void deveContinuarSemAutenticacaoQuandoTokenNulo() throws Exception {
        when(request.getHeader("Authorization")).thenReturn(null);

        securityFilter.doFilterInternal(request, response, filterChain);

        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void deveRecuperarTokenDoHeaderCorretamente() throws Exception {
        var method = SecurityFilter.class.getDeclaredMethod("recoverToken", HttpServletRequest.class);
        method.setAccessible(true);

        when(request.getHeader("Authorization")).thenReturn("Bearer " + TOKEN);
        var token = method.invoke(securityFilter, request);

        assertEquals(TOKEN, token);
    }

    @Test
    void deveRetornarNullSeHeaderForNulo() throws Exception {
        var method = SecurityFilter.class.getDeclaredMethod("recoverToken", HttpServletRequest.class);
        method.setAccessible(true);

        when(request.getHeader("Authorization")).thenReturn(null);
        var token = method.invoke(securityFilter, request);

        assertNull(token);
    }
}
