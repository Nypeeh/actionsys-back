import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { Employee } from '../infra/typeorm/entities/Employee'
import { IEmployeesRepository } from '../repositories/IEmployeesRepository'

@injectable()
export class ShowEmployeesService {
  constructor(
    @inject('EmployeesRepository')
    private employeeRepository: IEmployeesRepository,
  ) {}

  async execute(): Promise<Employee[]> {
    const employees = await this.employeeRepository.findAll()

    if (!employees[0]) {
      throw new AppError('User not found.')
    }

    const employeesWithoutPassword = employees.map(employee => {
      delete employee.password

      return employee
    })

    return employeesWithoutPassword
  }
}
