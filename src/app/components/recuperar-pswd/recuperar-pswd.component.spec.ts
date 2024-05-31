import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPswdComponent } from './recuperar-pswd.component';

describe('RecuperarPswdComponent', () => {
  let component: RecuperarPswdComponent;
  let fixture: ComponentFixture<RecuperarPswdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarPswdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecuperarPswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
