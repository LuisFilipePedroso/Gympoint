import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'

const routes = Router()

routes.post('/auth', SessionController.store)

routes.get('/students', StudentController.index)

routes.use(authMiddleware)

routes.post('/students', StudentController.store)
routes.put('/students/:id', StudentController.update)
routes.delete('/students/:id', StudentController.delete)

export default routes
