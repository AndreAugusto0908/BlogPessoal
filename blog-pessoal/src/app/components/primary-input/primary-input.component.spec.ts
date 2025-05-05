import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryInputComponent } from './primary-input.component';
import { By } from '@angular/platform-browser';

describe('PrimaryInputComponent', () => {
  let component: PrimaryInputComponent;
  let fixture: ComponentFixture<PrimaryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar onChange ao digitar no input', () => {
    const mockFn = jasmine.createSpy();
    component.registerOnChange(mockFn);

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Teste';
    input.dispatchEvent(new Event('input'));

    expect(mockFn).toHaveBeenCalledWith('Teste');
  });

  it('deve atualizar o valor ao chamar writeValue()', () => {
    component.writeValue('Angular');
    expect(component.value).toBe('Angular');
  });

  it('deve registrar função de toque com registerOnTouched()', () => {
    const mockTouched = jasmine.createSpy();
    component.registerOnTouched(mockTouched);
    component.onTouched();
    expect(mockTouched).toHaveBeenCalled();
  });

  it('deve permitir definir o tipo de input como "senha"', () => {
    component.type = 'senha';
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.type).toBe('senha');
  });
});
