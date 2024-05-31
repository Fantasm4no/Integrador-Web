import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirLibroComponent } from './anadir-libro.component';

describe('AnadirLibroComponent', () => {
  let component: AnadirLibroComponent;
  let fixture: ComponentFixture<AnadirLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirLibroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnadirLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
