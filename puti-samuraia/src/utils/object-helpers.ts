

export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {

    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}

export function see(...args) {
    // my func to shorten the printing syntax
    console.log(...args);
}


