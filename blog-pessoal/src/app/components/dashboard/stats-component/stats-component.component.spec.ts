import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponentComponent } from './stats-component.component';
import { PostService } from '../../../services/Post/post-service.service';
import { TemaService } from '../../../services/Tema/tema.service';
import { ChartService } from '../../../services/Chart/chart.service';
import { of } from 'rxjs';

describe('StatsComponentComponent', () => {
  let component: StatsComponentComponent;
  let fixture: ComponentFixture<StatsComponentComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;
  let chartServiceSpy: jasmine.SpyObj<ChartService>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['getAllPosts', 'getPostsByUser']);
    temaServiceSpy = jasmine.createSpyObj('TemaService', ['getAllTemas']);
    chartServiceSpy = jasmine.createSpyObj('ChartService', ['createBarChart']);

    await TestBed.configureTestingModule({
      imports: [StatsComponentComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: TemaService, useValue: temaServiceSpy },
        { provide: ChartService, useValue: chartServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve contar temas corretamente', () => {
    const mockPosts = [
      { id: 1, titulo: 'A', tema: 'Angular', nome: 'João', usuario: 'joao', texto: 'teste', data: '12/04' },
      { id: 2, titulo: 'B', tema: 'Angular', nome: 'João', usuario: 'joao', texto: 'teste', data: '12/04' },
      { id: 3, titulo: 'C', tema: 'React', nome: 'João', usuario: 'joao', texto: 'teste', data: '12/04' }
    ];
    const resultado = component.contarTemas(mockPosts);
    expect(resultado.get('Angular')).toBe(2);
    expect(resultado.get('React')).toBe(1);
  });

  it('deve retornar o tema com mais posts', () => {
    const mapa = new Map<string, number>([
      ['Angular', 3],
      ['React', 1]
    ]);
    const resultado = component.obterMaior(mapa);
    expect(resultado).toBe('Angular');
  });

  it('deve retornar o tema com menos posts', () => {
    const mapa = new Map<string, number>([
      ['Angular', 3],
      ['React', 1]
    ]);
    const resultado = component.obterMenor(mapa);
    expect(resultado).toBe('React');
  });

  it('deve carregar estatísticas corretamente', () => {
    const mockPosts = [
      { id: 1, titulo: 'Post A', tema: 'Angular', nome: 'Ana', usuario: 'ana', texto: 'teste', data: '12/04' }
    ];
    const mockTemas = [
      { id: 1, descricao: 'Angular' },
      { id: 2, descricao: 'React' }
    ];

    postServiceSpy.getAllPosts.and.returnValue(of(mockPosts));
    postServiceSpy.getPostsByUser.and.returnValue(of(mockPosts));
    temaServiceSpy.getAllTemas.and.returnValue(of(mockTemas));

    component.loadStats();

    expect(postServiceSpy.getAllPosts).toHaveBeenCalled();
    expect(postServiceSpy.getPostsByUser).toHaveBeenCalled();
    expect(temaServiceSpy.getAllTemas).toHaveBeenCalled();
  });
});
