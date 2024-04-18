import { QueryInterface } from 'sequelize'
import users from '../../core/constants/ConstUsers';
import logger from '../../logger/logger.index';

export async function up(
    queryInterface: QueryInterface) {
    const formData: any[] = []
    const date = new Date();

    for (const user of users) {
        formData.push({ ...user, created_at: date, updated_at: date })
        logger.info(`Added User name : ${user.fullName} email : ${user.email} role : ${user.role_id}`)
    }

    await queryInterface.bulkInsert({ tableName: 'User', schema: '.Split' }, formData)
}

export async function down(
    queryInterface: QueryInterface
) {
    logger.warn("Dropping User Table")
    await queryInterface.bulkDelete({ tableName: 'User', schema: '.Split' }, {})
}
