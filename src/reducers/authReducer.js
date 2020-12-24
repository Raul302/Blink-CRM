import { types } from "../types/types";


export const authReducer = ( state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                email: action.payload.email,
                id: action.payload.id,
                name: action.payload.name,
                token: action.payload.token,
                type: action.payload.type,
            }
        case types.logout:
            return {}
        default:
            return state;
    }

}