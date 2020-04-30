import React from "react";
import {NavIcon} from "../navIcon/navIcon";
import classes from "./footer.module.scss";

export const Footer:React.FC = ()=>{
        return(
            <footer className={classes.HomeFooter}>
                <NavIcon name="Event" />
                <NavIcon name="Post"  />
                <NavIcon name="Favorite"/>
            </footer>
        )
}
