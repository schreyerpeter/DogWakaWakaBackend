import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';

export type DogDocument = mongoose.HydratedDocument<Dog>;

@Schema()
export class Dog {
  @Prop()
  name: string;

  @Prop()
  breed: string;

  @Prop()
  profileImg: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const DogSchema = SchemaFactory.createForClass(Dog);
