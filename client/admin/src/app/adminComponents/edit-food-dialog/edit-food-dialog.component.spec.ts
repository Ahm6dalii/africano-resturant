import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodDialogComponent } from './edit-food-dialog.component';

describe('EditFoodDialogComponent', () => {
  let component: EditFoodDialogComponent;
  let fixture: ComponentFixture<EditFoodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFoodDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
