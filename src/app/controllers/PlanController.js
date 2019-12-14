import * as Yup from 'yup'
import Plan from '../models/Plan'

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({ order: [['id', 'asc']] })
    return res.json(plans)
  }

  async show(req, res) {
    const plans = await Plan.findByPk(req.params.id)

    if (!plans) {
      return res.json({ response: 'No data was found here :(' })
    }

    return res.json(plans)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(3),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const plan = await Plan.create(req.body)

    return res.json(plan)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().min(3),
      duration: Yup.number(),
      price: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const plan = await Plan.findByPk(req.params.id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' })
    }

    const { id, title, duration, price } = await plan.update(req.body)

    return res.json({
      id,
      title,
      duration,
      price,
    })
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' })
    }

    await plan.destroy()

    return res.json({ response: 'Plan deleted successfully' })
  }
}

export default new PlanController()
