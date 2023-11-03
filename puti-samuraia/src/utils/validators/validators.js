
export const required = (value) => {
    if (value) return undefined;
    return "Field is required!" // else statement
}

export const maxLengthCreator = (maxLength) => (value) => { // THIS IS A THUNK;

    if (value.length > maxLength) return `Max length is ${maxLength} symbols!`
    return undefined;
}

