package com.example.backblogpessoal.service;

import com.example.backblogpessoal.models.dtos.post.CriarTemaDTO;
import com.example.backblogpessoal.models.post.Tema;
import com.example.backblogpessoal.repository.TemaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TemaServiceTest {

    @InjectMocks
    private TemaService temaService;

    @Mock
    private TemaRepository temaRepository;

    // Constantes para evitar literais repetidas
    private static final String SAUDE = "Saúde";
    private static final String EDUCACAO = "Educação";
    private static final String MEIO_AMBIENTE = "Meio Ambiente";
    private static final String LITERATURA = "Literatura";
    private static final String TECH = "Tech";
    private static final String NOVA = "Nova";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveCriarTemaComSucesso() {
        CriarTemaDTO dto = new CriarTemaDTO(EDUCACAO);

        when(temaRepository.findByDescricao(EDUCACAO)).thenReturn(null);
        when(temaRepository.save(any(Tema.class))).thenAnswer(inv -> inv.getArgument(0));

        Tema tema = temaService.criarTema(dto);

        assertNotNull(tema);
        assertEquals(EDUCACAO, tema.getDescricao());
        verify(temaRepository).save(any(Tema.class));
    }

    @Test
    void deveLancarExcecaoQuandoTemaJaExisteAoCriar() {
        CriarTemaDTO dto = new CriarTemaDTO(SAUDE);
        when(temaRepository.findByDescricao(SAUDE)).thenReturn(new Tema());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> temaService.criarTema(dto));
        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());
    }

    @Test
    void deveEditarTemaComSucesso() {
        Long id = 1L;
        CriarTemaDTO dto = new CriarTemaDTO(MEIO_AMBIENTE);

        Tema temaExistente = new Tema("Outro");
        when(temaRepository.findById(id)).thenReturn(temaExistente);
        when(temaRepository.findByDescricao(MEIO_AMBIENTE)).thenReturn(temaExistente);
        when(temaRepository.save(any(Tema.class))).thenReturn(temaExistente);

        Tema temaEditado = temaService.editarTema(id, dto);

        assertEquals(MEIO_AMBIENTE, temaEditado.getDescricao());
    }

    @Test
    void deveLancarExcecaoQuandoIdNaoExisteAoEditar() {
        when(temaRepository.findById(1L)).thenReturn(null);
        CriarTemaDTO dto = new CriarTemaDTO(TECH);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> temaService.editarTema(1L, dto));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    @Test
    void deveLancarExcecaoQuandoDescricaoNaoExisteAoEditar() {
        Tema tema = new Tema("Atual");
        when(temaRepository.findById(1L)).thenReturn(tema);
        when(temaRepository.findByDescricao(NOVA)).thenReturn(null);

        CriarTemaDTO dto = new CriarTemaDTO(NOVA);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> temaService.editarTema(1L, dto));
        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());
    }

    @Test
    void deveExcluirTemaComSucesso() {
        Tema tema = new Tema(LITERATURA);
        when(temaRepository.findById(1L)).thenReturn(tema);

        temaService.excluirTema(1L);

        verify(temaRepository).delete(tema);
    }

    @Test
    void deveLancarExcecaoQuandoTemaNaoExisteAoExcluir() {
        when(temaRepository.findById(1L)).thenReturn(null);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> temaService.excluirTema(1L));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }

    @Test
    void deveListarTemasComSucesso() {
        Tema tema1 = new Tema(SAUDE);
        Tema tema2 = new Tema(EDUCACAO);

        when(temaRepository.findAll()).thenReturn(Arrays.asList(tema1, tema2));

        List<Tema> temas = temaService.listarTemas();

        assertEquals(2, temas.size());
    }

    @Test
    void deveLancarExcecaoQuandoNaoExistemTemas() {
        when(temaRepository.findAll()).thenReturn(Collections.emptyList());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> temaService.listarTemas());
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
    }
}
