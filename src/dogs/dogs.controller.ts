import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { DogsService } from './dogs.service';
import { CreateDogDto } from 'dto/create_dog_dto';
import { Dog } from './dog.schema';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post(':ownerId')
  async create(
    @Body() createDogDto: CreateDogDto,
    @Param('ownerId') ownerId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      return await this.dogsService.create(createDogDto, ownerId);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response): Promise<Dog[]> {
    try {
      return await this.dogsService.findAll();
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Dog> {
    try {
      return await this.dogsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).send(error.message);
      }
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }

  @Delete(':id/:ownerId')
  async delete(
    @Param('id') id: string,
    @Param('ownerId') ownerId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      return await this.dogsService.delete(id, ownerId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).send(error.message);
      }
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }
}
