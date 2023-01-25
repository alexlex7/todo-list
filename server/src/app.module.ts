import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsController } from './settings/settings.controller';
import { TodolistsModule } from './todolists/todolists.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todolists'),
    TodolistsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, SettingsController],
  providers: [
    AppService,
    // { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
})
export class AppModule {}
