import React from "react";
import classes from './navIcon.module.scss';
import {useDispatch,useSelector} from "react-redux";
import {activeEvent, activePost, activeFavorite} from '../../redux/action'

interface stateInterface{
    activePage:string,
    user:any
}

export const NavIcon:React.FC<{name:string}>
    = (props:any)=>{

    const dispatch = useDispatch();
    const activePage = useSelector((state:stateInterface) => state.activePage);

    function onActive(){
        switch(props.name){
            case "Event":
                dispatch(activeEvent());
                return;
            case "Post":
                dispatch(activePost());
                return;
            case "Favorite":
                dispatch(activeFavorite());
                return;
            default:
                dispatch(activeEvent());
                return;
        }
    }


    let img_path = "/images/"+props.name+".png";
    let img_active_path = "/images/"+props.name+"-active.png";
    if(props.name !== activePage){
        return(
            <div className={classes.Wrapper}>
            <img src={img_path} className={classes.NavIcon} onClick={onActive} alt={props.name}/>
            <div className={classes.Text}>{props.name}</div>
            </div>
            )
    }else{
        return(
            <div className={classes.Wrapper}>
            <img src={img_active_path} className={classes.NavIcon}
                 onClick={onActive} alt={props.name}/>
            <div className={classes.Text}>{props.name}</div>
            </div>
    )
    }
};

