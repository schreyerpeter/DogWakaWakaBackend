import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Dog } from '../dogs/dog.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  profileImg: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Dog.name }] })
  dogs: Dog[];
}

export const UserSchema = SchemaFactory.createForClass(User);
