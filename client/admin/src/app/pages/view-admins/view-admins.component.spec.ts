import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminsComponent } from './view-admins.component';

describe('ViewAdminsComponent', () => {
  let component: ViewAdminsComponent;
  let fixture: ComponentFixture<ViewAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
