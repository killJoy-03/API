import { z } from 'zod'

const create = z.object({
    name: z
        .string({
            required_error: 'name is required',
            invalid_type_error: 'name must be a string',
        })
        .min(3, `name must contain atleast 3 character`),
})

const roleSchema = { create }

export default roleSchema
