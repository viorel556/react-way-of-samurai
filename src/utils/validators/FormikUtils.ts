import {SearchFormType} from "../../types/types.ts";
import {FilterType} from "../../redux/users-reducer.ts";

export function searchBarFormTypeConvertor(values: SearchFormType): FilterType {
    /* FUNC converts the form types to expected FilterType */

    let friend: boolean | null; // in this case only friend value is problematic;
    switch(values.friend) {
        case "true": friend = true; break;
        case "false": friend = false; break;
        default: friend = null; break;
    }
    return {
        term: values.term,
        friend: friend
    }
}