/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCollectionName, ProductsSchema } from './entities/producto.entity';


@Module({
  imports:[MongooseModule.forFeature([{name: ProductCollectionName, schema: ProductsSchema}])],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
