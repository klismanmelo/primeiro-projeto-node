//SERVICES vai se preocupar com a REGRA DE NEGÓCIO da aplicação
import { startOfHour } from 'date-fns';
import Appointment from "../model/Appointments";
import AppointmentsRepository from '../repositories/AppointmentsRepository';
interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentServices {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }
  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointments is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  };
}

export default CreateAppointmentServices;
