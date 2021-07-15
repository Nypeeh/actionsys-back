import { AppError } from '@shared/errors/AppError'
import { FakeEmployeesRepository } from '../repositories/fakes/FakeEmployeesRepository'
import { UpdateProfileService } from './UpdateProfileService'

let fakeEmployeesRepository: FakeEmployeesRepository
let updateProfile: UpdateProfileService

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()
    updateProfile = new UpdateProfileService(fakeEmployeesRepository)
  })

  it('should be able to update an user', async () => {
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

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'Maria madalena',
      email: 'mariamadalena@example.com',
      admission_date: new Date(),
      birthday_date: new Date(),
      level: 'junior',
      office: 'auxiliar',
      sector: 'financeiro',
    })

    expect(userUpdated.name).toBe('Maria madalena')
    expect(userUpdated.email).toBe('mariamadalena@example.com')
  })

  it('should not be able to update a non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 51234,
        name: 'Maria madalena',
        email: 'mariamadalena@example.com',
        admission_date: new Date(),
        birthday_date: new Date(),
        level: 'junior',
        office: 'auxiliar',
        sector: 'financeiro',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update an user if email is already in use by another user', async () => {
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

    await fakeEmployeesRepository.create({
      name: 'Second User',
      email: 'seconduser@example.com',
      password: '123456',
      admission_date: new Date(),
      birthday_date: new Date(),
      level: 'junior',
      office: 'auxiliar',
      sector: 'financeiro',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'seconduser@example.com',
        admission_date: new Date(),
        birthday_date: new Date(),
        level: 'junior',
        office: 'auxiliar',
        sector: 'financeiro',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
