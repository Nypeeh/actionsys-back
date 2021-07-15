import { AppError } from '@shared/errors/AppError'
import { FakeEmployeesRepository } from '../repositories/fakes/FakeEmployeesRepository'
import { ShowEmployeesService } from './ShowEmployeesService'

let fakeEmployeesRepository: FakeEmployeesRepository
let showEmployees: ShowEmployeesService

describe('ShowEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()
    showEmployees = new ShowEmployeesService(fakeEmployeesRepository)
  })

  it('should be able to show all employees', async () => {
    const user = await fakeEmployeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      admission_date: new Date(),
      birthday_date: new Date(),
      level: 'junior',
      office: 'auxiliar',
      sector: 'financeiro',
    })

    const employees = await showEmployees.execute()

    expect(employees[0].id).toBe(user.id)
  })

  it('should not be able to show all employees if user does not exists', async () => {
    await expect(showEmployees.execute()).rejects.toBeInstanceOf(AppError)
  })
})
