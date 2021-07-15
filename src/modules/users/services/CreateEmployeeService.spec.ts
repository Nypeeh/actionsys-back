import { AppError } from '@shared/errors/AppError'
import { FakeHashProvider } from '../repositories/fakes/FakeHashProvider'
import { FakeEmployeesRepository } from '../repositories/fakes/FakeEmployeesRepository'
import { CreateEmployeeService } from './CreateEmployeeService'

let fakeEmployeesRepository: FakeEmployeesRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateEmployeeService

describe('CreateEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()
    fakeHashProvider = new FakeHashProvider()
    createUser = new CreateEmployeeService(
      fakeEmployeesRepository,
      fakeHashProvider,
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      admission_date: new Date(),
      birthday_date: new Date(),
      level: 'junior',
      office: 'auxiliar',
      sector: 'financeiro',
    })

    expect(user).toHaveProperty('id')
  })

  it('should be able to create a new user with same email from another', async () => {
    await createUser.execute({
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
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        admission_date: new Date(),
        birthday_date: new Date(),
        level: 'junior',
        office: 'auxiliar',
        sector: 'financeiro',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
