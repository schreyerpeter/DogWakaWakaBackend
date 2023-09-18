import { Dog } from 'src/dogs/dog.schema';

export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly profileImg: string;
  readonly address: string;
  readonly dogs: Dog[];
}
