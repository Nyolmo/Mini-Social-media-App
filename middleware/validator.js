import Joi from "joi";

export const signUpSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.empty': 'Username cannot be empty',
        'any.required': 'Username is required'
    }),
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net']}
        }),
    password: Joi.string()
        .required()
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        )
        .message('Password must be at least 8 chars, include uppercase, lowercase, number and special character')
});

export const signInSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.empty': 'Username cannot be empty',
        'any.required': 'Username is required'
    }),
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net']}
        }),
    password: Joi.string()
        .required()
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        )
        .message('Password must be at least 8 chars, include uppercase, lowercase, number and special character')
});