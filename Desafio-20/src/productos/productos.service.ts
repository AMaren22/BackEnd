/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { ProductCollectionName, ProductDocument } from './entities/producto.entity';
import { asDto, ReadProductoDTO } from './dto/read-producto.dto';

@Injectable()
export class ProductosService {
  constructor(@InjectModel(ProductCollectionName) private ProductModel: Model<ProductDocument>){}
  
  async create(product: CreateProductoDto) {
    return this.ProductModel.create(product)
  }

  async findAll():Promise<ReadProductoDTO|ReadProductoDTO[]>  {  
    const getProducts = await this.ProductModel.find()
    const getsProductsDTO = asDto(getProducts)
    return getsProductsDTO
  }

}
