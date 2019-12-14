import Mail from '../../lib/Mail'

class AnswerMail {
  get key() {
    return 'AnswerMail'
  }

  async handle({ data }) {
    const { student_name, student_email, question, answer } = data

    await Mail.sendMail({
      to: student_email,
      subject: 'Question answered',
      template: 'answer',
      context: {
        student_name,
        question,
        answer,
      },
    })
  }
}

export default new AnswerMail()
