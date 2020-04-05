import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatMessagingInputComponent} from './chat-messaging-input.component';

describe('ChatMessagingInputComponent', () => {
  let component: ChatMessagingInputComponent;
  let fixture: ComponentFixture<ChatMessagingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMessagingInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
