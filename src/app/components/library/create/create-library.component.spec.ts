import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLibraryComponent } from './create-library.component';

describe('CreateLibraryComponent', () => {
  let component: CreateLibraryComponent;
  let fixture: ComponentFixture<CreateLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
