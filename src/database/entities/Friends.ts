import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Base, { IBaseEntity } from "./Base";
import User from "./User";

interface FriendEntity extends IBaseEntity {
    user_id: string;
    friends: string[];
}

export type UserAttributes = Omit<
    FriendEntity,
    'id' | 'created_at' | 'updated_at' | 'deleted_at'
>

@Table({ tableName: 'User', paranoid: true, timestamps: true, updatedAt: false })
class Friend extends Base {
    @ForeignKey(() => User)
    @Column({ type: DataType.UUIDV4 })
    userId!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUIDV4 })
    friendId!: string;
}
export default Friend 