import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DialogSchema } from './schemas/dialog.schema';
import { DialogsController } from './dialogs.controller';
import { DialogsService } from './dialogs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Dialog', schema: DialogSchema }]),
  ],
  controllers: [DialogsController],
  providers: [DialogsService],
  exports: [DialogsService],
})
export class DialogsModule {}
