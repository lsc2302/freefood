import React from 'react';
import './App.css';
import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import {SignUp} from './pages/signUp/signup';
import Profile from './pages/profile/profile';
import Report from './pages/report/report';
import {connect} from "react-redux";


function App (props){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={(props) => <Login {...props} />} exact/>
                <Route path='/signup' component={(props) => <SignUp {...props} />} exact/>
                <Route path='/profile' render={()=>props.user&&props.user.get('id')?<Profile {...props}/>:<Redirect to='/login' />} exact/> />
                <Route path='/report' render={()=>props.user&&props.user.get('id')?<Report {...props}/>:<Redirect to='/login' />} exact/> />
                <Route path='/' render={()=>props.user&&props.user.get('id')?<Home {...props}/>:<Redirect to='/login' />} exact/>
                <Redirect to='/login' />
            </Switch>
        </BrowserRouter>
    )
}

export default connect((state) => ({user: state.user}))(App);

