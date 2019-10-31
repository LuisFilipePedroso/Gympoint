import Student from '../models/Student'

class StudentController {
  async index(req, res) {
    const students = await Student.findAll()
    return res.json(students)
  }

  async store(req, res) {
    const { email } = req.body

    const studentExists = await Student.findOne({
      where: {
        email,
      },
    })

    if (studentExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await Student.create(req.body)

    return res.json(user)
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id)

    if (req.body.email !== student.email) {
      const studentExists = await Student.findOne({
        where: {
          email: req.body.email,
        },
      })

      if (studentExists) {
        return res.status(400).json({ error: 'User already exists' })
      }
    }

    const { id, name, age, weight, height } = await student.update(req.body)

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    })
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id)

    if (!student) {
      return res.status(400).json({ error: 'User does not exists' })
    }

    await student.destroy()

    return res.json({ success: 'User was deleted successfully' })
  }
}

export default new StudentController()
