import React, {Component} from "react";
import classes from "./home.module.scss";
import {Header} from '../../UI/header/header'
import {Content} from '../../UI/content/content'
import {Footer} from '../../UI/footer/footer'
import {connect} from 'react-redux'
import {activeEvent} from "../../redux/action";

const mapDispatchToProps= ()=>{
    return (dispatch: any) => {dispatch(activeEvent())}
};

class Home extends Component<{user:any,mapDispatchToProps:any}> {

    componentDidMount(): void {
        if(!this.props.user.get('id')){
            window.location.href = '/login'
        }
        this.props.mapDispatchToProps();
    }

    render(){

        return(
            <div className={classes.Home}>
                <Header />
                <Content />
                <Footer />
            </div>
        )
    }
}
export default connect(
    (state:any) => ({user: state.user}),
    {mapDispatchToProps}
)(Home);

