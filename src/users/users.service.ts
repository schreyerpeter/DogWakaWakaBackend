import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'dto/create_user_dto';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async update(data: CreateUserDto, id: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      data,
    );
    if (!updatedUser) {
      throw new NotFoundException();
    }
    return updatedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .populate('dogs', ['name', 'breed', 'profileImg'])
      .exec();
  }

  async findOne(id: string): Promise<User> {
    const user = this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedUser) {
      throw new NotFoundException();
    }
    return deletedUser;
  }
}
