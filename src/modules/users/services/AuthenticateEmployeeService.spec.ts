import { AppError } from '@shared/errors/AppError'
import { FakeHashProvider } from '../repositories/fakes/FakeHashProvider'
import { FakeEmployeesRepository } from '../repositories/fakes/FakeEmployeesRepository'
import { AuthenticateEmployeeService } from './AuthenticateEmployeeService'
import { CreateEmployeeService } from './CreateEmployeeService'

let fakeEmployeesRepository: FakeEmployeesRepository
let fakeHashProvider: FakeHashProvider
let createEmployee: CreateEmployeeService
let authenticateUser: AuthenticateEmployeeService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()
    fakeHashProvider = new FakeHashProvider()
    createEmployee = new CreateEmployeeService(
      fakeEmployeesRepository,
      fakeHashProvider,
    )
    authenticateUser = new AuthenticateEmployeeService(
      fakeEmployeesRepository,
      fakeHashProvider,
    )
  })

  it('should be able to authenticate', async () => {
    const user = await createEmployee.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      admission_date: new Date(),
      birthday_date: new Date(),
      level: 'junior',
      office: 'auxiliar',
      sector: 'financeiro',
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate if email is undefined', async () => {
    await expect(
      authenticateUser.execute({
        email: '',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate if password is undefined', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@emailerrado.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createEmployee.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      admission_date: new Date(),
      birthday_date: new Date(),
      level: 'junior',
      office: 'auxiliar',
      sector: 'financeiro',
    })

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'senhaerrada',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
