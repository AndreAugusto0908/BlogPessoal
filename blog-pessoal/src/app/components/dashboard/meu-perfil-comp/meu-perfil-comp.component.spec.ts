import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPerfilCompComponent } from './meu-perfil-comp.component';

describe('MeuPerfilCompComponent', () => {
  let component: MeuPerfilCompComponent;
  let fixture: ComponentFixture<MeuPerfilCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuPerfilCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuPerfilCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
