import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';
import { Dog } from '../dogs/dog.schema';

export type AppointmentDocument = mongoose.HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop()
  // dates store as ISO strings
  startTime: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  client: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' })
  dog: Dog;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
