import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDogDto } from 'dto/create_dog_dto';
import { Model } from 'mongoose';
import { Appointment } from 'src/appointments/appointment.schema';
import { Dog } from './dog.schema';
import { User } from 'src/users/user.schema';

@Injectable()
export class DogsService {
  constructor(
    @InjectModel(Dog.name) private readonly dogModel: Model<Dog>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  async create(createDogDto: CreateDogDto, ownerId: string): Promise<Dog> {
    const createdDog = await this.dogModel.create(createDogDto);
    // Add the dog to the user's dogs array
    this.userModel
      .updateOne({ _id: ownerId }, { $push: { dogs: createdDog } })
      .exec();
    return createdDog;
  }

  async findAll(): Promise<Dog[]> {
    return this.dogModel.find().exec();
  }

  async findOne(id: string): Promise<Dog> {
    const dog = await this.dogModel.findOne({ _id: id }).exec();
    if (!dog) {
      throw new NotFoundException();
    }
    return dog;
  }

  async delete(id: string, ownerId: string) {
    const deletedDog = await this.dogModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedDog) {
      throw new NotFoundException();
    }
    // Remove all appointments that reference this dog
    await this.appointmentModel.deleteMany({ dog: id });
    // Remove all references to this dog from the user
    this.userModel
      .findOneAndUpdate(
        { _id: ownerId },
        {
          $pull: {
            dogs: id,
          },
        },
      )
      .exec();
    return deletedDog;
  }
}
