import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAppointmentDto } from 'dto/create_appointment_dto';
import { Model } from 'mongoose';
import { Appointment } from './appointment.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const existingAppointment: Appointment | null =
      await this.appointmentModel.findOne({
        startTime: createAppointmentDto.startTime,
      });
    if (existingAppointment) {
      throw new ConflictException('Appointment already exists');
    }
    const createdAppointment =
      await this.appointmentModel.create(createAppointmentDto);
    return createdAppointment;
  }

  async findAll(): Promise<Appointment[]> {
    // if fields aren't populated, they will be the reference ID
    return this.appointmentModel
      .find()
      .populate('dog')
      .populate('client')
      .exec();
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = this.appointmentModel.findOne({ _id: id }).exec();
    if (!appointment) {
      throw new NotFoundException();
    }
    return appointment;
  }

  async delete(id: string): Promise<Appointment> {
    const deletedAppointment = await this.appointmentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedAppointment) {
      throw new NotFoundException();
    }
    return deletedAppointment;
  }
}
