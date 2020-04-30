import React  from "react";
import {Event} from "../event/event";
import {Favorite} from "../favorite/favorite";
import {Post} from "../post/post";
import {useSelector} from "react-redux";

interface stateInterface{
    activePage:string,
    user:any
}

export const Content:React.FC=(props:any):any=>{
    const activePage = useSelector((state:stateInterface) => state.activePage);
    switch (activePage) {
        case "Event":
            return (
                <Event />
            );
        case "Favorite":
            return(
                <Favorite />
            );
        case "Post":{
            return(
                <Post />
            );
        }
        default:return (
            <Event />
        );
    }
};
