import React,{useState} from "react";
import classes from './postStar.module.scss'
import {addEventUser, removeEventUser} from "../../api";


export const PostStar:React.FC<{active:boolean, eventId:number, rsvps:number, setRsvps:any}> = (props:any):any=>{

    const [active, setActive] = useState(props.active);

    async function onActive(event:any){
        event.stopPropagation();
        let response;
        if(!active){
            response = await addEventUser({eventId:props.eventId});
        }else{
            response = await removeEventUser({eventId:props.eventId});
        }
        if(response.status === 0){
            if(!active){
                props.setRsvps(props.rsvps+1)
            }else{
                props.setRsvps(props.rsvps-1)
            }
            setActive(!active);
        }
        else{
            alert("couldn't move event to/out your favorite list!")
        }
    }
    let img_path = "/images/star-black.png";
    let img_active_path = "/images/star-black-active.png";
    let path='';
    if(active){
        path = img_active_path;
    }else{
        path = img_path;
    }
    return(<img src={path} className={classes.postStar} onClick={event=>onActive(event)} alt="star" />)
};

