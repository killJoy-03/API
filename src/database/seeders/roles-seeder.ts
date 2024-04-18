import { QueryInterface } from 'sequelize'
import ConstRoles from '../../core/constants/ConstRoles'
import logger from '../../logger/logger.index';


const data = [
    {
        id: ConstRoles.BasicUser,
        name: 'Basic User',
    },
    {
        id: ConstRoles.Admin,
        name: 'Admin',
    },
    {
        id: ConstRoles.SuperAdmin,
        name: 'Super Admin',
    },
]

export async function up(
    queryInterface: QueryInterface) {
    const formData: any[] = []

    const date = new Date();
    for (const role of data) {
        formData.push({ ...role, created_at: date, updated_at: date })
        logger.info(`Added Role name : ${role.name}`)
    }

    await queryInterface.bulkInsert({ tableName: 'Role', schema: '.Split' }, formData)
}

export async function down(
    queryInterface: QueryInterface
) {
    logger.warn("Dropping Role Table")
    await queryInterface.bulkDelete({ tableName: 'Role', schema: '.Split' }, {})
}
