import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppointmentsModule } from './appointments.module';
import { AppointmentsService } from './appointments.service';
import { INestApplication } from '@nestjs/common';
import { Appointment } from '../appointments/appointment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Dog } from '../dogs/dog.schema';

describe('Appointments', () => {
  // TODO: beef up these tests
  const mockAppointment = <Appointment>{
    startTime: 'Sun Sep 16 2023 03:52:50 GMT-0700 (Pacific Daylight Time)',
    client: <User>{ firstName: 'John', lastName: 'Doe' },
    dog: <Dog>{ name: 'Cupcake', breed: 'Mastiff' },
  };
  let app: INestApplication;
  let appointments = {
    findAll: () => [mockAppointment],
    create: () => mockAppointment,
    delete: () => mockAppointment,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppointmentsModule,
        MongooseModule.forRootAsync({
          useFactory: () => ({
            // TODO: figure out how to grab these values from .env
            uri: 'mongodb+srv://pschreyer:dogwakawaka@cluster0.aoomzlu.mongodb.net/',
          }),
        }),
      ],
    })
      .overrideProvider(AppointmentsService)
      .useValue(appointments)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET appointments`, () => {
    return request(app.getHttpServer())
      .get('/appointments')
      .expect(200)
      .expect(appointments.findAll());
  });

  it(`/POST an appointment`, () => {
    return request(app.getHttpServer())
      .post('/appointments')
      .expect(201)
      .expect(appointments.create());
  });

  it(`/DELETE an appointment`, () => {
    return request(app.getHttpServer())
      .delete('/appointments/APPOINTMENT_ID')
      .expect(200)
      .expect(appointments.delete());
  });

  afterAll(async () => {
    await app.close();
  });
});
