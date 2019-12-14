import * as Yup from 'yup'
import HelpOrder from '../models/HelpOrder'
import Student from '../models/Student'

import AnswerMail from '../jobs/AnswerMail'
import Queue from '../../lib/Queue'

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    })

    return res.json(helpOrders)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string()
        .min(5)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    let helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: {
        model: Student,
      },
    })

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help order does not exists' })
    }

    helpOrder = await helpOrder.update({
      answer: req.body.answer,
    })

    const data = {
      student_name: helpOrder.Student.name,
      student_email: helpOrder.Student.email,
      question: helpOrder.question,
      answer: req.body.answer,
    }

    await Queue.add(AnswerMail.key, data)

    return res.json(helpOrder)
  }
}

export default new HelpOrderController()
