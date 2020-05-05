import React, {Component} from "react";
import classes from "./profile.module.scss";
import {connect} from "react-redux";
import {Redirect} from "react-router";

class Profile extends Component<{user:any}> {

    state={
        back:false
    };

    onBack =()=>{
        this.setState({back:true})
    };

    render(){
        if(this.state.back){
            return <Redirect to='/' />
        }
        let user = this.props.user;
        return(
            <div className={classes.Profile}>
                <header className={classes.ProfileHeader}>
                    <img src="/images/back.png" alt="back" className={classes.ProfileBack} onClick={this.onBack}/>
                    <span className={classes.ProfilePageName}>Profile</span>
                </header>
                <article className={classes.ProfileMiddle}>
                    <div>
                        <img src="/images/user.png" className={classes.ProfileImage} alt="avatar"/>
                        <h2>{user.get('username')}</h2>
                    </div>
                    <div>
                        <div className={classes.ProfileInfo}>
                            <img src="images/house.png" alt="location"/>
                            Location:{user.get('location')}
                        </div>
                        <div className={classes.ProfileInfo}>
                            <img src="images/telephone.png" alt="telephone"/>
                            Tel: {user.get('tel')}
                        </div>
                        <div className={classes.ProfileInfo}>
                            <img src="images/email.png" alt="email"/>
                            Email:{user.get('email')}
                        </div>
                    </div>
                </article>
            </div>)
    }
}

export default connect((state:any) => ({user: state.user}))(Profile);

