import { getRepository, Repository } from 'typeorm'
import { IEmployeesRepository } from '@modules/users/repositories/IEmployeesRepository'
import { ICreateEmployeeDTO } from '@modules/users/dtos/ICreateEmployeeDTO'
import { Employee } from '../entities/Employee'

export class EmployeesRepository implements IEmployeesRepository {
  private ormRepository: Repository<Employee>

  constructor() {
    this.ormRepository = getRepository(Employee)
  }

  async findAll(): Promise<Employee[] | undefined> {
    const employees = await this.ormRepository.find()

    return employees
  }

  async findById(id: number): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne(id)

    return employee
  }

  async findByEmail(email: string): Promise<Employee> {
    const employee = await this.ormRepository.findOne({ email })

    return employee
  }

  async create({
    name,
    email,
    password,
    admission_date,
    birthday_date,
    level,
    office,
    sector,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = await this.ormRepository.create({
      name,
      email,
      password,
      admission_date,
      birthday_date,
      level,
      office,
      sector,
    })
    await this.ormRepository.save(employee)

    return employee
  }

  async save(employee: Employee): Promise<Employee> {
    return await this.ormRepository.save(employee)
  }

  async delete(employeeId: number): Promise<void> {
    await this.ormRepository.delete(employeeId)
  }
}
