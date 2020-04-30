import React from "react";
import classes from "./topmenu.module.scss";
import { Menu } from 'semantic-ui-react'

export const TopMenu:React.FC<{
    show:boolean,
    onProfile:()=>void;
    onReport:()=>void;
    onLogout:()=>void;

}> = (props:any):any=>{
    if(props.show){
        return (
            <div className={classes.Menu}>
                <Menu pointing vertical>
                    <Menu.Item
                        name='Profile'
                        active={props.activeItem === 'Profile'}
                        onClick={props.onProfile}
                    />
                    <Menu.Item
                        name='Report'
                        active={props.activeItem === 'Report'}
                        onClick={props.onReport}
                    />
                    <Menu.Item
                        name='Logout'
                        active={props.activeItem === 'Logout'}
                        onClick={props.onLogout}
                    />
                </Menu>
            </div>
        )
    }
    else{
        return(<></>)
    }
}
