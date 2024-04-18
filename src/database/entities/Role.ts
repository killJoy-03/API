import {
    Column,
    DataType,
    DeletedAt,
    Scopes,
    Table,
} from 'sequelize-typescript'
import Base, { type IBaseEntity } from './Base'
interface RoleEntity extends IBaseEntity {
    name: string
    deletedAt?: Date | null
}

export type RoleAttributes = Omit<RoleEntity, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
@Scopes(() => ({ withPassword: {}, }))
@Table({ tableName: 'Role', paranoid: true, timestamps: true })
class Role extends Base {
    @DeletedAt
    @Column
    deleted_at?: Date

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string

}
export default Role
