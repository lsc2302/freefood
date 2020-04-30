import fetchFunc from './fetchFunc'
export const signIn = (user)=>fetchFunc('/signIn',user,'POST');
export const checkUserOnline = ()=>fetchFunc('/checkUserOnline',{},'POST');
export const logout = ()=>fetchFunc('/logout',{},'POST');
export const signUp = (user)=>fetchFunc('/signUp',user,'POST');
export const addEvent = (event)=>fetchFunc('/addEvent',event,'POST');
export const showEvents = ()=>fetchFunc('/showEvents',{},'POST');
export const showEventUser = (username)=>fetchFunc('/showEventUser',username,'POST');
export const addEventUser = (event)=>fetchFunc('/addEventUser',event,'POST');
export const removeEventUser = (event)=>fetchFunc('/removeEventUser',event,'POST');