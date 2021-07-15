import { AppError } from '@shared/errors/AppError'
import { FakeEmployeesRepository } from '../repositories/fakes/FakeEmployeesRepository'
import { DeleteEmployeeService } from './DeleteEmployeeService'

let fakeEmployeesRepository: FakeEmployeesRepository
let deleteProfile: DeleteEmployeeService

describe('DeleteEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()
    deleteProfile = new DeleteEmployeeService(fakeEmployeesRepository)
  })

  it('should be able to delete an employee', async () => {
    const employee = await fakeEmployeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      admission_date: new Date(),
      birthday_date: new Date(),
      level: 'junior',
      office: 'auxiliar',
      sector: 'financeiro',
    })

    await deleteProfile.execute(employee.id)

    const employees = await fakeEmployeesRepository.findAll()

    expect(employees[0]).toBeUndefined()
  })

  it('should not be able to delete an employee if user does not exists', async () => {
    const userDoesNotExistsId = 53746

    await expect(
      deleteProfile.execute(userDoesNotExistsId),
    ).rejects.toBeInstanceOf(AppError)
  })
})
