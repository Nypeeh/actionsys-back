import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateEmployeeService } from '@modules/users/services/AuthenticateEmployeeService'

export class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateEmployeeService)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    return response.json({ user, token })
  }
}
