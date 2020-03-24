import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(typeOrmConfig()), TaskModule, AuthModule]
})
export class AppModule { }
