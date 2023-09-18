import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from 'src/dogs/dog.schema';
import { DogsController } from './dogs.controller';
import { User, UserSchema } from 'src/users/user.schema';
import {
  Appointment,
  AppointmentSchema,
} from 'src/appointments/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
