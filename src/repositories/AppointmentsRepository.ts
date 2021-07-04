//REPOSITORY é as função que vai trabalhar com os MODELS
import Appointment from "../model/Appointments";
import { isEqual } from 'date-fns';

// Date Transfer Object
interface CreateAppointemntDTO {
  provider: string;
  date: Date;
}

class AppointmentsRpository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create({date,provider}: CreateAppointemntDTO): Appointment{
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRpository;
