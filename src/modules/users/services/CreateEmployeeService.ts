import { inject, injectable } from 'tsyringe'

import { Employee } from '../infra/typeorm/entities/Employee'
import { AppError } from '@errors/AppError'
import { IEmployeesRepository } from '../repositories/IEmployeesRepository'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  name: string
  email: string
  password: string
  birthday_date: Date
  admission_date: Date
  sector: string
  office: string
  level: string
}

@injectable()
export class CreateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
    birthday_date,
    admission_date,
    sector,
    office,
    level,
  }: IRequest): Promise<Employee> {
    const checkUserExists = await this.employeesRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.employeesRepository.create({
      name,
      email,
      password: hashedPassword,
      birthday_date,
      admission_date,
      sector,
      office,
      level,
    })

    delete user.password

    return user
  }
}
