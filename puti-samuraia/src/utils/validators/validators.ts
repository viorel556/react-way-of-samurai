
export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return "Field is required!" // else statement
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    // THIS IS A THUNK
    if (value.length > maxLength) return `Max length is ${maxLength} symbols!`
    return undefined;
}

