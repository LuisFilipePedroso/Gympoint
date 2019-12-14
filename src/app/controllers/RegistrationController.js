import * as Yup from 'yup'

import { addMonths } from 'date-fns'
import StringMask from 'string-mask'

import Registration from '../models/Registration'
import Plan from '../models/Plan'
import Student from '../models/Student'

import RegistrationMail from '../jobs/RegistrationMail'
import Queue from '../../lib/Queue'

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      student_id: Yup.number().required(),
      startDate: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const plan = await Plan.findByPk(req.body.planId)

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' })
    }

    const student = await Student.findByPk(req.body.studentId)

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' })
    }

    const endDate = addMonths(new Date(req.body.startDate), plan.duration)

    const price = plan.duration * plan.price

    const registration = await Registration.create({
      plan_id: req.body.planId,
      student_id: req.body.studentId,
      start_date: req.body.startDate,
      end_date: endDate,
      price,
    })

    const formatter = new StringMask('###.##,##')

    const data = {
      email: student.email,
      name: student.name,
      plan: plan.title,
      price: formatter.apply(plan.price),
      startDate: req.body.startDate,
      endDate,
    }

    await Queue.add(RegistrationMail.key, data)

    return res.json(registration)
  }
}

export default new RegistrationController()
