export interface Validator {
    required: boolean
    length?: {
        min?: number
        max?: number
    }
    range?: {
        min?: number
        max?: number
    }
}

export function validate(value: any, validator: Validator) {
    console.log("validation", value, validator)
    let errors: { value: any; msg: string }[] = []
    if (validator.required) {
        if (typeof value === "string" && value.trim().length === 0) {
            errors.push({ value, msg: "is required" })
        }
        if (typeof value === "number" && !!!value) {
            errors.push({ value, msg: "is required" })
        }
    }

    if (validator.length && typeof value === "string") {
        if (validator.length.min && value.length < validator.length.min) {
            errors.push({ value, msg: "too short" })
        }

        if (validator.length.max && value.length > validator.length.max) {
            errors.push({ value, msg: "too long" })
        }
    }

    if (validator.range && typeof value === "number") {
        if (validator.range.min && value < validator.range.min) {
            errors.push({ value, msg: "too small" })
        }

        if (validator.range.max && value > validator.range.max) {
            errors.push({ value, msg: "too big" })
        }
    }

    console.log("errors", errors)
    return errors
}
