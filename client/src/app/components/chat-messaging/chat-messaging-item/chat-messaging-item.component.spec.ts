import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatMessagingItemComponent} from './chat-messaging-item.component';

describe('ChatMessagingItemComponent', () => {
  let component: ChatMessagingItemComponent;
  let fixture: ComponentFixture<ChatMessagingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMessagingItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
