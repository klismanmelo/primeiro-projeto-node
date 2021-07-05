// As ROTAS devem se preocupar apenas com:
// Receber a requisição, Chamar outro arquivo, Devovler uma resposta;

import { request, response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter =  Router();


appointmentsRouter.get('/', async (request,response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date); // Transformação de Dados;

    const createAppointemnt = new CreateAppointmentService(); //REGRA DE NEGÓCIO

    const appointment = await createAppointemnt.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch(err) {
    return response.status(400).json({error: err.message});
  }

});

export default appointmentsRouter;
