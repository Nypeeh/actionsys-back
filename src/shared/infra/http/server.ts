import 'reflect-metadata'

import express, { json, NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import { errors } from 'celebrate'
import cors from 'cors'

import { routes } from './routes'
import { AppError } from '@errors/AppError'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()
const PORT = 3333

app.use(cors())
app.use(json())
app.use(routes)

app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    console.log(err)
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(400).json({
    status: 'error',
    message: err.message,
  })

  // return response.status(500).json({
  //   status: 'error',
  //   message: 'Internal server error',
  // })
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
