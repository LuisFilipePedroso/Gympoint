import Sequelize, { Model } from 'sequelize'

class Checkin extends Model {
  static init(sequelize) {
    super.init({ student_id: Sequelize.INTEGER }, { sequelize })

    this.removeAttribute('id')

    return this
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' })
  }
}

export default Checkin
