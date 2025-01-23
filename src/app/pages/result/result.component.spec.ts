import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ result: '123' }), // Mock des paramètres de route si nécessaire
            snapshot: {
              params: {
                date: '123' // Mock des paramètres de route si nécessaire
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
