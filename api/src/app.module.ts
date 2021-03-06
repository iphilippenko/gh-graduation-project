import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { FilesModule } from './files/files.module';
import config from './common/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot(config.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: false,
    }),
    CommonModule,
    UsersModule,
    MessagesModule,
    DialogsModule,
    FilesModule,
  ],
})
export class AppModule {}
