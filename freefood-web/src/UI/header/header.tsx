import React,{useState} from "react";
import {useDispatch} from 'react-redux'
import classes from "./header.module.scss";
import {TopMenu} from '../topmenu/topmenu';
import storage from "../../utils/localstorage";
import {resetUser} from "../../redux/action";
import {Redirect} from "react-router";


export const Header:React.FC = (props)=>{

    const [showMenu,setShowMenu] = useState<boolean>(false);
    const [nextPage,setNextPage] = useState<string>('');


    const dispatch = useDispatch();

    function onProfile(){
        setNextPage('/profile')
    }

    function onReport(){
        setNextPage('/report')
    }

    function onLogout (){
        storage.removeUser();
        dispatch(resetUser());
        setNextPage('/login')
    }

    function onMenu(){
        setShowMenu(!showMenu)
    }

    if(nextPage !== '')return(<Redirect to={nextPage} />);
    return(
            <div className={classes.HomeHeader}>
                <header>
                    <img src="/images/menu.png"
                         alt="menu"
                         className={classes.MenuIcon}
                         onClick={onMenu}/>
                </header>
                <TopMenu
                    show={showMenu}
                    onProfile={onProfile}
                    onReport={onReport}
                    onLogout={onLogout}
                />
            </div>
        )
};
