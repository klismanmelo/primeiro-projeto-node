//REPOSITORY é as função que vai trabalhar com os MODELS
import { EntityRepository, Repository } from 'typeorm';

import Appointment from "../model/Appointments";


// Date Transfer Object
@EntityRepository(Appointment)
class AppointmentsRpository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    })

    return findAppointment || null;
  }
}

export default AppointmentsRpository;
