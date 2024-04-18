import { v4 as uuidV4 } from 'uuid';
import ConstRoles from './ConstRoles';
const BasicUser = {
    id: uuidV4(),
    fullName: "Basic User",
    email: "basic_user@split.com",
    role_id: ConstRoles.BasicUser
}
const AdminUser = {
    id: uuidV4(),
    fullName: "Admin User",
    email: "admin_user@split.com",
    role_id: ConstRoles.Admin
}
const SuperAdminUser = {
    id: uuidV4(),
    fullName: "Super Admin User",
    email: "super_admin_user@split.com",
    role_id: ConstRoles.SuperAdmin
}

const users = [BasicUser, AdminUser, SuperAdminUser]
export default users;