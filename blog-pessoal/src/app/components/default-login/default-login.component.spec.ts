import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultLoginComponent } from './default-login.component';

describe('DefaultLoginComponent', () => {
  let component: DefaultLoginComponent;
  let fixture: ComponentFixture<DefaultLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultLoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir o evento submit ao chamar sumbit()', () => {
    spyOn(component.onSubmit, 'emit');
    component.sumbit();
    expect(component.onSubmit.emit).toHaveBeenCalled();
  });

  it('deve emitir o evento navigate ao chamar navigate()', () => {
    spyOn(component.onNavigate, 'emit');
    component.navigate();
    expect(component.onNavigate.emit).toHaveBeenCalled();
  });

  it('deve usar valores padrão corretamente', () => {
    expect(component.subText).toBe('');
    expect(component.yellowSubText).toBe('');
    expect(component.bttnText).toBe('');
    expect(component.disableButton).toBeTrue();
  });
});
