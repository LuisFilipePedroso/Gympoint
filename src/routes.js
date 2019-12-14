import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'
import PlanController from './app/controllers/PlanController'
import RegistrationController from './app/controllers/RegistrationController'

const routes = Router()

routes.post('/auth', SessionController.store)

routes.get('/students', StudentController.index)

routes.use(authMiddleware)

routes.post('/students', StudentController.store)
routes.put('/students/:id', StudentController.update)
routes.delete('/students/:id', StudentController.delete)

routes.get('/plans', PlanController.index)
routes.get('/plans/:id', PlanController.show)
routes.post('/plans', PlanController.store)
routes.put('/plans/:id', PlanController.update)
routes.delete('/plans/:id', PlanController.delete)

routes.post('/registration', RegistrationController.store)

export default routes
