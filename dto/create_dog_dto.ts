import { User } from 'src/users/user.schema';

export class CreateDogDto {
  readonly name: string;
  readonly breed: string;
  readonly profileImg: string;
  readonly owner: User;
}
