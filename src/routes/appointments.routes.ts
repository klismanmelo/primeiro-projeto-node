// As ROTAS devem se preocupar apenas com:
// Receber a requisição, Chamar outro arquivo, Devovler uma resposta;

import { request, response, Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter =  Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentsRouter.get('/', (request,response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date); // Transformação de Dados;

    const createAppointemnt = new CreateAppointmentService(appointmentsRepository); //REGRA DE NEGÓCIO

    const appointment = createAppointemnt.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch(err) {
    return response.status(400).json({error: err.message});
  }

});

export default appointmentsRouter;
