import React from 'react';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import {SignUp} from './pages/signUp/signup';
import Profile from './pages/profile/profile';
import Report from './pages/report/report';


export default function(props:any){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={ (props:any) => <Login {...props} />}/>
                    <Route path='/signup' component={(props:any) => <SignUp {...props} />} />
                    <Route path='/profile' component={(props:any) => <Profile {...props} />} />
                    <Route path='/report' component={(props:any) => <Report {...props} />} />
                    <Route path='/' component={(props:any) => <Home {...props} />} />
                </Switch>
            </BrowserRouter>
        )
}
