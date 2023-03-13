/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { MongooseModule } from '@nestjs/mongoose' 
import { config } from './config/global';

@Module({
  imports: [ProductosModule, MongooseModule.forRoot(config.URI, {retryAttempts: 2})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
