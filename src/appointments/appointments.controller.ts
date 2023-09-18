import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.schema';
import { CreateAppointmentDto } from '../../dto/create_appointment_dto';
import { Response } from 'express';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Appointment> {
    try {
      return await this.appointmentsService.create(createAppointmentDto);
    } catch (error) {
      // Return a 409 if the appointment already exists
      if (error instanceof ConflictException) {
        res.status(HttpStatus.CONFLICT).send(error.message);
      }
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
  ): Promise<Appointment[]> {
    try {
      return await this.appointmentsService.findAll();
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
  ): Promise<Appointment> {
    try {
      return await this.appointmentsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).send(error.message);
      }
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Appointment> {
    try {
      return await this.appointmentsService.delete(id);
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
