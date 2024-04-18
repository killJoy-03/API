import { z } from "zod";
const create = z.object({
    fullName: z
        .string({
            required_error: 'fullName is required',
            invalid_type_error: 'fullName must be a string',
        })
        .trim()
        .min(5, "fullName should be min. of 5 character"),

    email: z
        .string({
            required_error: 'email is required',
            invalid_type_error: 'email must be a string',
        })
        .email({ message: 'invalid email address' })
        .min(2, "email can't be empty"),

    phone: z.string().nullable(),
    image: z.string().nullable(),
    password: z.string().nullable(),
    role_id: z
        .string({
            required_error: 'role_id is required',
            invalid_type_error: 'role_id must be a string',
        })
        .uuid({ message: 'role_id invalid uuid format' }),
})
const login = z.object({
    email: z
        .string()
        .email({ message: 'invalid email address' })
        .min(2, "email can't be empty"),

    password: z.string().trim().min(8, "password must contain 8 character"),
})

const userSchema = {
    create,
    register: create,
    login,
}

export default userSchema