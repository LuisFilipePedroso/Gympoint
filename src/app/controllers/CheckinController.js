import { Op } from 'sequelize'
import { addDays, startOfDay, endOfDay } from 'date-fns'
import Checkin from '../models/Checkin'
import Student from '../models/Student'

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params

    const checkins = await Checkin.findAll({ where: { student_id } })

    return res.json(checkins)
  }

  async store(req, res) {
    const { student_id } = req.params

    const user = await Student.findByPk(student_id)

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' })
    }

    const hasAvailableChecking = await Checkin.count({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(new Date()), endOfDay(addDays(new Date(), 7))],
        },
      },
    })

    if (hasAvailableChecking && hasAvailableChecking > 5) {
      return res.status(400).json({ error: 'You can only make 5 checkins per week' })
    }

    const checkin = await Checkin.create({ student_id })

    return res.json(checkin)
  }
}

export default new CheckinController()
