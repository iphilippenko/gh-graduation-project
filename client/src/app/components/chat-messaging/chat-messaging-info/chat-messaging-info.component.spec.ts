import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagingInfoComponent } from './chat-messaging-info.component';

describe('ChatMessagingInfoComponent', () => {
  let component: ChatMessagingInfoComponent;
  let fixture: ComponentFixture<ChatMessagingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessagingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
