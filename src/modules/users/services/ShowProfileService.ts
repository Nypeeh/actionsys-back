import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { Employee } from '../infra/typeorm/entities/Employee'
import { IEmployeesRepository } from '../repositories/IEmployeesRepository'

@injectable()
export class ShowProfileService {
  constructor(
    @inject('EmployeesRepository')
    private employeeRepository: IEmployeesRepository,
  ) {}

  async execute(user_id: number): Promise<Employee> {
    const user = await this.employeeRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}
