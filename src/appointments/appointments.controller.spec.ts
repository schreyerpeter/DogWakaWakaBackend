import { Test } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './appointment.schema';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Dog } from '../dogs/dog.schema';
import { Response } from 'express';

describe('AppointmentsController', () => {
  let appointmentsController: AppointmentsController;
  let appointmentsService: AppointmentsService;

  const res = {} as unknown as Response;
  res.json = jest.fn();
  res.status = jest.fn(() => res);

  beforeEach(async () => {
    function mockAppointmentModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const moduleRef = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        AppointmentsService,
        {
          provide: getModelToken(Appointment.name),
          useValue: mockAppointmentModel,
        },
      ],
    }).compile();

    appointmentsService =
      moduleRef.get<AppointmentsService>(AppointmentsService);
    appointmentsController = moduleRef.get<AppointmentsController>(
      AppointmentsController,
    );
  });

  describe('create', () => {
    it('should return a created appointment', async () => {
      const result = <Appointment>{
        startTime: 'Sun Sep 16 2023 03:52:50 GMT-0700 (Pacific Daylight Time)',
        client: new User(),
        dog: new Dog(),
      };
      jest.spyOn(appointmentsService, 'create').mockResolvedValue(result);

      expect(
        await appointmentsController.create(
          {
            startTime: new Date().toString(),
            client: new User(),
            dog: null,
          },
          res,
        ),
      ).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      const result = [new Appointment()];
      jest.spyOn(appointmentsService, 'findAll').mockResolvedValue(result);

      expect(await appointmentsController.findAll(res)).toBe(result);
    });
  });

  describe('find', () => {
    it('should return one appointment', async () => {
      const result = <Appointment>{
        startTime: 'Sun Sep 16 2023 03:52:50 GMT-0700 (Pacific Daylight Time)',
        client: new User(),
        dog: new Dog(),
      };
      jest.spyOn(appointmentsService, 'findOne').mockResolvedValue(result);

      expect(await appointmentsController.findOne('appointment_id', res)).toBe(
        result,
      );
    });
  });

  describe('delete', () => {
    it('should return one appointment', async () => {
      const result = <Appointment>{
        startTime: 'Sun Sep 16 2023 03:52:50 GMT-0700 (Pacific Daylight Time)',
        client: new User(),
        dog: new Dog(),
      };
      jest.spyOn(appointmentsService, 'delete').mockResolvedValue(result);

      expect(await appointmentsController.delete('appointment_id', res)).toBe(
        result,
      );
    });
  });
});
