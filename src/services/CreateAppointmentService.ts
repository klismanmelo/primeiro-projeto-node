//SERVICES vai se preocupar com a REGRA DE NEGÓCIO da aplicação
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from "../model/Appointments";
import AppointmentsRepository from '../repositories/AppointmentsRepository';
interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentServices {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointments is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  };
}

export default CreateAppointmentServices;
