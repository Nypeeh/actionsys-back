import { ICreateEmployeeDTO } from '../dtos/ICreateEmployeeDTO'
import { Employee } from '../infra/typeorm/entities/Employee'

export interface IEmployeesRepository {
  findAll(): Promise<Employee[] | undefined>
  findById(id: number): Promise<Employee | undefined>
  findByEmail(email: string): Promise<Employee | undefined>
  create(data: ICreateEmployeeDTO): Promise<Employee>
  save(employee: Employee): Promise<Employee>
  delete(employeeId: number): Promise<void>
}
