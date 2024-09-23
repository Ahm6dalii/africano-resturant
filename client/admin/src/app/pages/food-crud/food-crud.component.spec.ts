import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCrudComponent } from './food-crud.component';

describe('FoodCrudComponent', () => {
  let component: FoodCrudComponent;
  let fixture: ComponentFixture<FoodCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
