import { Router } from 'express'

import { employeesRouter } from '@modules/users/infra/http/routes/employees.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'

export const routes = Router()

routes.use('/employees', employeesRouter)
routes.use('/sessions', sessionsRouter)
