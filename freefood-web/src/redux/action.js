import {
    RECEIVE_USER,
    RESET_USER,
    EVENT,
    POST,
    FAVORITE
} from './action-types'


export const receiveUser = (user) => ({type: RECEIVE_USER, user:user});
export const resetUser = ()=>({type: RESET_USER});
export const activeEvent = ()=>({type:EVENT});
export const activePost = ()=>({type:POST});
export const activeFavorite = ()=>({type:FAVORITE});

