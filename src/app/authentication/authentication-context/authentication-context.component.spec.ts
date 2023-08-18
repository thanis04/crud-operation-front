import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationContextComponent } from './authentication-context.component';

describe('AuthenticationContextComponent', () => {
  let component: AuthenticationContextComponent;
  let fixture: ComponentFixture<AuthenticationContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationContextComponent]
    });
    fixture = TestBed.createComponent(AuthenticationContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
