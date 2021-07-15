import { IEmployeesRepository } from '@modules/users/repositories/IEmployeesRepository'
import { ICreateEmployeeDTO } from '@modules/users/dtos/ICreateEmployeeDTO'
import { Employee } from '@modules/users/infra/typeorm/entities/Employee'
import { v4 as uuid } from 'uuid'

export class FakeEmployeesRepository implements IEmployeesRepository {
  private employees: Employee[] = []

  async findAll(): Promise<Employee[] | undefined> {
    return this.employees
  }

  async findById(id: number): Promise<Employee | undefined> {
    const findEmployee = this.employees.find(employee => employee.id === id)

    return findEmployee
  }

  async findByEmail(email: string): Promise<Employee | undefined> {
    const findEmployee = this.employees.find(
      employee => employee.email === email,
    )

    return findEmployee
  }

  async create({
    name,
    email,
    password,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const id = uuid()
    const employee = new Employee()

    Object.assign(employee, { id, name, email, password })

    this.employees.push({ ...employee })

    return employee
  }

  async save(employee: Employee): Promise<Employee> {
    const findIndex = this.employees.findIndex(
      findEmployee => findEmployee.id === employee.id,
    )

    this.employees[findIndex] = employee

    return employee
  }

  async delete(employeeId: number): Promise<void> {
    const findIndex = this.employees.findIndex(
      findEmployee => findEmployee.id === employeeId,
    )

    this.employees.splice(findIndex, 1)

    console.log(this.employees)
  }
}
