import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  DeletedAt,
  ForeignKey, IsUUID,
  Scopes,
  Table,
  Unique
} from 'sequelize-typescript';
import Base, { type IBaseEntity } from './Base';
import bcrypt from "bcrypt";
import Role from './Role';
import Friend from './Friends';
import ConstRoles from '../../core/constants/ConstRoles';
interface UserEntity extends IBaseEntity {
  fullName: string
  email: string
  password?: string | null
  phone?: string | null
  image?: string | null
  role_id: string
  deleted_at?: Date | null
}

export interface UserLoginAttributes {
  uid: string
}

export type LoginAttributes = Pick<UserEntity, 'email' | 'password'>

export type UserAttributes = Omit<
  UserEntity,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>

@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes(() => ({
  withPassword: {},
}))
@Scopes(() => ({
  friends: {
    include: [{ model: User, through: { attributes: [] } }],
  },
}))
@Table({ tableName: 'User', paranoid: true, timestamps: true })
class User extends Base {
  @DeletedAt
  @Column
  deleted_at?: Date

  @Column({ type: DataType.STRING, allowNull: false })
  fullName!: string

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  email!: string

  @Column({ type: DataType.STRING })
  password?: string

  @Column({ type: DataType.STRING('20') })
  phone?: string

  @Column({ type: DataType.TEXT })
  image?: string

  @IsUUID(4)
  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    defaultValue: () => ConstRoles.BasicUser,
    allowNull: false,
  })
  role_id!: string

  @BelongsTo(() => Role)
  role!: Role

  @BelongsToMany(() => User, () => Friend, "userId", "friendId")
  friends!: User[]

  static async setUserPassword(instance: User, password: string): Promise<void> {
    //todo: add password validator in schema
    var hashedPwd = bcrypt.hashSync(password, 10);
    instance.setDataValue('password', hashedPwd);
  }
  comparePassword?: (password: string) => boolean;

}

// compare password
User.prototype.comparePassword = function (
  password: string
): boolean {
  return bcrypt.compareSync(password, String(this.password));
}

export default User
