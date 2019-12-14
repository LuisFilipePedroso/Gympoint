import { format, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'
import Mail from '../../lib/Mail'

class RegistrationMail {
  get key() {
    return 'RegistrationMail'
  }

  async handle({ data }) {
    const { email, name, plan, price, startDate, endDate } = data

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Nova matrícula',
      template: 'registration',
      context: {
        studentName: name,
        plan,
        value: price,
        startDate: format(parseISO(startDate), "'dia' dd 'de' MMMM', às' H:mm'h'", { 
          locale: pt,
        }),
        endDate: format(parseISO(endDate), "'dia' dd 'de' MMMM', às' H:mm'h'", { 
          locale: pt,
        }),
      },
    })
  }
}

export default new RegistrationMail()
