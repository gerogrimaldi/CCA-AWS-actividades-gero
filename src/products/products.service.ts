import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';
import { NotifGateway } from 'src/notif/notif.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private readonly notificacionsGateway: NotifGateway
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.prisma.product.findFirst({
      where: {name: createProductDto.name }
    });
    if (existingProduct) {
      throw new HttpException(`Product with name: ${createProductDto.name} already exists`, HttpStatus.CONFLICT);
    }

    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    return `Product with name: ${product.name} created successfully`;
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany();
      return products
    }
    catch(error) {
        return error
      }
  }

  async findOne(id: number) {
  // busco el producto por id
    const product = await this.prisma.product.findUnique({
      where: {id: id}
    });
    // si no existe el producto, devuelvo un error
    if (!product) {
      throw new HttpException(`Product with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // busco el producto por id
    const product = await this.prisma.product.findUnique({
      where: {id: id}
    });
    // si no existe el producto, devuelvo un error
    if (!product) {
      throw new HttpException(`Product with id: ${id} not found`, HttpStatus.NOT_FOUND);
    };
    // actualizo el producto
    const updatedProduct = await this.prisma.product.update({
      where: {id: id},
      data: updateProductDto
    });

    if(
      updatedProduct.stock !== undefined &&
      updatedProduct.stock !== product.stock
    ) {
      this.notificacionsGateway.handleStockUpdate(updatedProduct.name, updatedProduct.stock);
    }

    return `Product with id: ${updatedProduct.id} updated successfully`;
  }

  async remove(id: number) {
    // busco el producto por id
    const product = await this.prisma.product.findUnique({
      where: {id: id}
    });
    // si no existe el producto, devuelvo un error
    if (!product) {
      throw new HttpException(`Product with id: ${id} not found`, HttpStatus.NOT_FOUND);
    };
    // elimino el producto
    await this.prisma.product.delete({
      where: {id: id}
    });
    return `Product with id: ${id} deleted successfully`;
  }
}
