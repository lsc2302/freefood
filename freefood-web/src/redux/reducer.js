import {combineReducers} from 'redux'
import {Map,fromJS} from 'immutable'

import {
    RECEIVE_USER,
    RESET_USER,
    EVENT,
    POST,
    FAVORITE
} from './action-types'


function user(state = Map(), action) {
    switch (action.type) {
        case RECEIVE_USER:
            state = state.mergeWith((oldval, newval)=>{return newval}, fromJS(action.user));
            state = state.set('status',0);
            state = state.set('message',"login successfully! ");
            return state;
        case RESET_USER:
            state=Map();
            state = state.set('status',2);
            state = state.set('message',"logout!");
            return state;
        default:
            state = state.merge({status:-1});
            return state;
    }
}

function activePage(state='',action){
    switch(action.type){
        case EVENT:
            state = 'Event';
            return state;
        case POST:
            state = 'Post';
            return state;
        case FAVORITE:
            state = 'Favorite';
            return state;
        default:
            return state;
    }
}

export default combineReducers({
    user,
    activePage
})