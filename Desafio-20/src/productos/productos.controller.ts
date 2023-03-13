/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductDocument } from './entities/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post('save')
  create(@Body() createProductoDto: CreateProductoDto):Promise<ProductDocument> {
    return this.productosService.create(createProductoDto);
  }

  @Get('/list')
  findAll() {
    return this.productosService.findAll();
  }
}
