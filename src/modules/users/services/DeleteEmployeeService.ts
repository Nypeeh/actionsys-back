import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { IEmployeesRepository } from '../repositories/IEmployeesRepository'

@injectable()
export class DeleteEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  async execute(employeeId: number): Promise<void> {
    const userExists = await this.employeesRepository.findById(employeeId)

    if (!userExists) {
      throw new AppError('User does not exists.')
    }

    await this.employeesRepository.delete(userExists.id)
  }
}
