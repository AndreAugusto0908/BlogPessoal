import { Component, OnInit } from '@angular/core';
import { TemaService } from '../../../services/Tema/tema.service';
import { PostService } from '../../../services/Post/post-service.service';
import { PostResponse } from '../../../types/post-resonse.type';
import { TemaResponse } from '../../../types/tema-response.type';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ChartService } from '../../../services/Chart/chart.service';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

/**
 * Componente responsável por exibir as estatísticas do blog e do usuário,
 * incluindo dados totais e gráficos de distribuição por tema.
 */
@Component({
  selector: 'app-stats-component',
  imports: [],
  templateUrl: './stats-component.component.html',
  styleUrl: './stats-component.component.css'
})
export class StatsComponentComponent implements OnInit {
  allPosts: PostResponse[] = [];
  userPosts: PostResponse[] = [];
  temas: TemaResponse[] = [];

  totalPosts = 0;
  totalTemas = 0;
  temaMaisPosts = '';
  temaMenosPosts = '';
  totalPostsUsuario = 0;
  temaMaisPostsUsuario = '';
  temaMenosPostsUsuario = '';

  constructor(
    private postService: PostService,
    private temaService: TemaService,
    private chartService: ChartService
  ) {}

    /**
   * Executa o carregamento inicial das estatísticas e dos dados.
   */
  ngOnInit(): void {
    this.loadStats();
  }

    /**
   * Carrega os dados de posts, temas e estatísticas do usuário.
   * Também aciona os métodos de contagem e análise.
   */
  loadStats() {
    this.postService.getAllPosts().subscribe(posts => {
      this.allPosts = posts;
      this.totalPosts = posts.length;
      this.calcularTemasGlobais();
    });

    this.postService.getPostsByUser().subscribe(userPosts => {
      this.userPosts = userPosts;
      this.totalPostsUsuario = userPosts.length;
      this.calcularTemasUsuario();
    });

    this.temaService.getAllTemas().subscribe(temas => {
      this.temas = temas;
      this.totalTemas = temas.length;
    });
  }

  
  /**
   * Calcula o tema com mais e menos postagens no sistema (geral).
   */
  calcularTemasGlobais() {
    const countMap = this.contarTemas(this.allPosts);
    this.temaMaisPosts = this.obterMaior(countMap);
    this.temaMenosPosts = this.obterMenor(countMap);
  }

    /**
   * Calcula o tema com mais e menos postagens do usuário logado.
   */
  calcularTemasUsuario() {
    const countMap = this.contarTemas(this.userPosts);
    this.temaMaisPostsUsuario = this.obterMaior(countMap);
    this.temaMenosPostsUsuario = this.obterMenor(countMap);
  }

    /**
   * Gera um mapa com a contagem de posts por tema.
   * @param posts Lista de postagens a serem processadas
   * @returns Mapa com tema → quantidade
   */
  contarTemas(posts: PostResponse[]) {
    const mapa = new Map<string, number>();
    posts.forEach(post => {
      const tema = post.tema;
      mapa.set(tema, (mapa.get(tema) || 0) + 1);
    });
    return mapa;
  }

    /**
   * Obtém o tema com a maior quantidade de postagens.
   * @param mapa Mapa com a contagem de temas
   * @returns Tema com maior valor ou 'Nenhum'
   */
  obterMaior(mapa: Map<string, number>): string {
    let max = -1;
    let tema = '';
    mapa.forEach((valor, chave) => {
      if (valor > max) {
        max = valor;
        tema = chave;
      }
    });
    return tema || 'Nenhum';
  }

    /**
   * Obtém o tema com a menor quantidade de postagens.
   * @param mapa Mapa com a contagem de temas
   * @returns Tema com menor valor ou 'Nenhum'
   */
  obterMenor(mapa: Map<string, number>): string {
    let min = Infinity;
    let tema = '';
    mapa.forEach((valor, chave) => {
      if (valor < min) {
        min = valor;
        tema = chave;
      }
    });
    return tema || 'Nenhum';
  }

  
  /**
   * Após a renderização da view, gera os gráficos de barras
   * para posts por tema (geral e do usuário).
   */
  ngAfterViewInit() {
    this.postService.getAllPosts().subscribe(posts => {
      const mapa = this.contarTemas(posts);
      this.chartService.createBarChart(
        'chartGlobal',
        Array.from(mapa.keys()),
        Array.from(mapa.values()),
        'Posts por Tema (Geral)'
      );
    });
  
    this.postService.getPostsByUser().subscribe(posts => {
      const mapa = this.contarTemas(posts);
      this.chartService.createBarChart(
        'chartUser',
        Array.from(mapa.keys()),
        Array.from(mapa.values()),
        'Posts por Tema (Usuário)'
      );
    });
  }
}
