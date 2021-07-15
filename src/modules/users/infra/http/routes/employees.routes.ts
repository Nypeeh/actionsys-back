import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { EmployeesController } from '../controllers/EmployeesController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const employeesRouter = Router()

const employeesController = new EmployeesController()

// Buscar todos os funcionarios
employeesRouter.get('/', ensureAuthenticated, employeesController.index)

// Buscar um funcionario
employeesRouter.get(
  '/:employeeId',
  ensureAuthenticated,
  employeesController.show,
)

// Atualizar dados
employeesRouter.put(
  '/:employeeId',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(200).required(),
      email: Joi.string().max(100).email().required(),
      birthday_date: Joi.date().required(),
      admission_date: Joi.date().required(),
      sector: Joi.string()
        .max(100)
        .valid('engenharia', 'compras', 'vendas', 'financeiro')
        .required(),

      office: Joi.string()
        .max(100)
        .valid('auxiliar', 'tecnico', 'engenheiro', 'diretor')
        .required(),
      level: Joi.string()
        .max(100)
        .valid('junior', 'pleno', 'senior', 'diretor')
        .required(),
    },
  }),
  employeesController.update,
)

// Criar um funcionario
employeesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(200).required(),
      email: Joi.string().max(100).email().required(),
      password: Joi.string().required(),
      birthday_date: Joi.date().required(),
      admission_date: Joi.date().required(),
      sector: Joi.string()
        .max(100)
        .valid('engenharia', 'compras', 'vendas', 'financeiro')
        .required(),
      office: Joi.string()
        .max(100)
        .valid('auxiliar', 'tecnico', 'engenheiro', 'diretor')
        .required(),
      level: Joi.string()
        .max(100)
        .valid('junior', 'pleno', 'senior', 'diretor')
        .required(),
    },
  }),
  employeesController.create,
)

// Deletar um funcionario
employeesRouter.delete(
  '/:employeeId',
  celebrate({
    [Segments.PARAMS]: {
      employeeId: Joi.number().integer().required(),
    },
  }),
  employeesController.delete,
)
