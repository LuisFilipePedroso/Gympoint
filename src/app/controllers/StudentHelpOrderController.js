import * as Yup from 'yup'
import HelpOrder from '../models/HelpOrder'
import Student from '../models/Student'

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: req.params.student_id,
      },
    })

    return res.json(helpOrders)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string()
        .min(5)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { student_id } = req.params

    const user = await Student.findByPk(student_id)

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' })
    }

    const helpOrder = await HelpOrder.create({
      question: req.body.question,
      student_id,
    })

    return res.json(helpOrder)
  }
}

export default new HelpOrderController()
