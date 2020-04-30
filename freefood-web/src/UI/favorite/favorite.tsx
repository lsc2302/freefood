import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import classes from "./favorite.module.scss";
import {showEventUser} from '../../api';
import {eventInterface} from '../../interface'
import {EventItem} from "../eventItem/eventItem";


export const Favorite:React.FC = ()=> {

    const [userEvent,setUserEvent]=useState([]);
    const user = useSelector((state:{user:any}) => state.user);

    useEffect(()=>{
        const abortController = new AbortController();
        async function fetchData(){
            const userEvent = await showEventUser({username:user.get("username")});
            setUserEvent(userEvent.data);
        }
            fetchData();
        return function cleanup() {
            abortController.abort();
        };
    },[]);

    function eventsDisplay (userEvent:eventInterface[]){
        return userEvent.map((data)=>{
            return(
                <EventItem data={data} key={data.id} page="favorite"/>
            );
        })
    }

    return(
        <article className={classes.HomeMiddle}>
            <div className={classes.PostsEvent} >
                {eventsDisplay(userEvent)}
            </div>
        </article>
    )
};
