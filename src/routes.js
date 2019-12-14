import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'
import PlanController from './app/controllers/PlanController'
import RegistrationController from './app/controllers/RegistrationController'
import CheckinController from './app/controllers/CheckinController'
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController'
import GymHelpOrderController from './app/controllers/GymHelpOrderController'

const routes = Router()

routes.post('/auth', SessionController.store)

routes.get('/students', StudentController.index)

routes.get('/students/:student_id/checkins', CheckinController.index)
routes.post('/students/:student_id/checkins', CheckinController.store)

routes.get('/students/:student_id/help-orders', StudentHelpOrderController.index)
routes.post('/students/:student_id/help-orders', StudentHelpOrderController.store)

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

routes.get('/help-orders', GymHelpOrderController.index)
routes.put('/help-orders/:id/answer', GymHelpOrderController.update)

export default routes
