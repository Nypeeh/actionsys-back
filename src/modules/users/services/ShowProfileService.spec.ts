import { AppError } from '@shared/errors/AppError'
import { FakeEmployeesRepository } from '../repositories/fakes/FakeEmployeesRepository'
import { ShowProfileService } from './ShowProfileService'

let fakeEmployeesRepository: FakeEmployeesRepository
let showProfile: ShowProfileService

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()
    showProfile = new ShowProfileService(fakeEmployeesRepository)
  })

  it('should be able to show the profile', async () => {
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

    const profile = await showProfile.execute(user.id)

    expect(profile.id).toBe(user.id)
    expect(profile.name).toBe(user.name)
    expect(profile.email).toBe(user.email)
  })

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfile.execute(5341)).rejects.toBeInstanceOf(AppError)
  })
})
