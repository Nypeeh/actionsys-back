import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { Employee } from '../infra/typeorm/entities/Employee'
import { IEmployeesRepository } from '../repositories/IEmployeesRepository'

interface IRequest {
  user_id: number
  name: string
  email: string
  birthday_date: Date
  admission_date: Date
  sector: string
  office: string
  level: string
}

@injectable()
export class UpdateProfileService {
  constructor(
    @inject('EmployeesRepository')
    private employeeRepository: IEmployeesRepository,
  ) {}

  async execute({
    user_id,
    name,
    email,
    birthday_date,
    admission_date,
    sector,
    office,
    level,
  }: IRequest): Promise<Employee> {
    const employee = await this.employeeRepository.findById(user_id)

    if (!employee) {
      throw new AppError('User not found.')
    }

    const userWithUpdatedEmail = await this.employeeRepository.findByEmail(
      email,
    )

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.')
    }

    employee.name = name
    employee.email = email
    employee.birthday_date = birthday_date
    employee.admission_date = admission_date
    employee.sector = sector
    employee.office = office
    employee.level = level

    const employeeUpdated = await this.employeeRepository.save(employee)

    return employeeUpdated
  }
}
