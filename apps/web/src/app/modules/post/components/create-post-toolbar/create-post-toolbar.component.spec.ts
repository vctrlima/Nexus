import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostToolbarComponent } from './create-post-toolbar.component';

describe('CreatePostToolbarComponent', () => {
  let component: CreatePostToolbarComponent;
  let fixture: ComponentFixture<CreatePostToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
