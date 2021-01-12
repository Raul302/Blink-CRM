// colleges :{
//     name:
//     type:
//     Country:
//     Website:
//     description:
//     start boarding grades:
//     end boarding grades :
//     start day grades:
//     end day grades:
//     total boarding grades:
//     total international grades:
//     total day students:
//     total students in school
//     location
//     Sports
//     Arts
//     Special clinics

import { types } from "../types/types";


// }
const initialState = {
    colleges :[],
    active: null,
}
export const collegesReducer = ( state = initialState,action ) => {
    switch (action.type) {
            case types.collegesActive:
                localStorage.setItem( 'collegeActive', JSON.stringify(action.payload));
                return {
                    ...state,
                    active: {
                        ...action.payload
                    }
                }
            case types.collegesLoad:
                return {
                    ...state,
                    colleges: [...action.payload]
                }
        default:
            return state;
    }

}