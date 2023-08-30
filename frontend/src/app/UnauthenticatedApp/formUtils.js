export const REQUIRED_MESSAGE = 'Please fill out this field.';

export const EMAIL_VALIDATION_MESSAGE = 'Invalid Email';

export const emailFieldRules = {
    required: REQUIRED_MESSAGE,
    pattern: {
        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid Email'
    }
}

export const requiredFieldRules = {
    required: REQUIRED_MESSAGE,
}
