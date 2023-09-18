import { Dog } from 'src/dogs/dog.schema';
import { User } from 'src/users/user.schema';

export class CreateAppointmentDto {
  readonly startTime: string;
  readonly client: User;
  readonly dog: Dog;
}
