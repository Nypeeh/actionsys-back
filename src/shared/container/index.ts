import { container } from 'tsyringe'

import '@modules/users/providers'

import { IEmployeesRepository } from '@modules/users/repositories/IEmployeesRepository'
import { EmployeesRepository } from '@modules/users/infra/typeorm/repositories/EmployeesRepository'

container.registerSingleton<IEmployeesRepository>(
  'EmployeesRepository',
  EmployeesRepository,
)
