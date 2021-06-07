
// ╔═══╗──╔╗───────────╔══╗
// ║╔═╗║─╔╝╚╗──────────║╔╗║
// ║║─║╠═╩╗╔╬╦══╦═╗╔══╗║╚╝╚╦╦══╗
// ║╚═╝║╔═╣║╠╣╔╗║╔╗╣══╣║╔═╗╠╣╔╗║
// ║╔═╗║╚═╣╚╣║╚╝║║║╠══║║╚═╝║║╚╝║
// ╚╝─╚╩══╩═╩╩══╩╝╚╩══╝╚═══╩╩══╝
import { types } from "../../types/types";   

export const activeUser = (contact) => ({
    type: types.ContactCActive,
    payload:{
        ...contact
    }
})

 export const setUsers = ( users ) => ({
    // type: types.remindersCLoad,
    type: types.UsersLoad,
     payload:[...users]
 })