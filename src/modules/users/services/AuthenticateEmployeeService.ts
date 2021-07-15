import { Employee } from '../infra/typeorm/entities/Employee'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { IEmployeesRepository } from '../repositories/IEmployeesRepository'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: Employee
  token: string
}

@injectable()
export class AuthenticateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    if (!email) throw new AppError('email invalid')
    if (!password) throw new AppError('password invalid')

    const user = await this.employeesRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    delete user.password

    return { user, token }
  }
}
