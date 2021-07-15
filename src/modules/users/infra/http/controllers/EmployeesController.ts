import { CreateEmployeeService } from '@modules/users/services/CreateEmployeeService'
import { DeleteEmployeeService } from '@modules/users/services/DeleteEmployeeService'
import { ShowEmployeesService } from '@modules/users/services/ShowEmployeesService'
import { ShowProfileService } from '@modules/users/services/ShowProfileService'
import { UpdateProfileService } from '@modules/users/services/UpdateProfileService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class EmployeesController {
  async index(request: Request, response: Response): Promise<Response> {
    const showEmployees = container.resolve(ShowEmployeesService)

    const employees = await showEmployees.execute()

    return response.json(employees)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const showProfile = container.resolve(ShowProfileService)

    const employee = await showProfile.execute(user_id)

    delete employee.password

    return response.json(employee)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      birthday_date,
      admission_date,
      sector,
      office,
      level,
    } = request.body

    const createEmployee = container.resolve(CreateEmployeeService)

    const employee = await createEmployee.execute({
      name,
      email,
      password,
      birthday_date,
      admission_date,
      sector,
      office,
      level,
    })

    return response.json(employee)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { employeeId } = request.params
    const {
      name,
      email,
      birthday_date,
      admission_date,
      sector,
      office,
      level,
    } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    const user = await updateProfile.execute({
      user_id: Number(employeeId),
      name,
      email,
      birthday_date,
      admission_date,
      sector,
      office,
      level,
    })

    delete user.password

    return response.json(user)
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { employeeId } = request.params

    const deleteEmployee = container.resolve(DeleteEmployeeService)

    await deleteEmployee.execute(Number(employeeId))

    return response.status(204).json()
  }
}
