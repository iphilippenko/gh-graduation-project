import { Test, TestingModule } from '@nestjs/testing';
import { DialogsController } from './dialogs.controller';

describe('Dialogs Controller', () => {
  let controller: DialogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DialogsController],
    }).compile();

    controller = module.get<DialogsController>(DialogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
