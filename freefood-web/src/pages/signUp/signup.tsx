import React, {useState} from "react";
import {Button, Form, Message} from "semantic-ui-react";
import classes from "./signup.module.scss";
import {signUp} from '../../api'
import {Redirect} from "react-router";

export const SignUp:React.FC = ()=>{

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [location,setLocation] = useState("");
    const [email,setEmail] = useState("");
    const [tel,setTel] = useState("");
    const [signIn,setSignIn] = useState(false);
    const [message,setMessage] = useState("");
    const [showMessage,setShowMessage] = useState(false);

    async function handleClick(){
        const usernamePattern = /^([a-zA-Z0-9_]{4,16})$/;
        const passwordPattern = /^[\w]{6,12}$/;
        const emailPattern = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
        const telPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        if(!username.match(usernamePattern)){
            setShowMessage(true);
            setMessage("username must be 4-16 digits number or English character");
            return;
        }
        if(!password.match(passwordPattern)){
            setShowMessage(true);
            setMessage("password must be 6-12 digits English character");
            return;
        }
        if(!email.match(emailPattern)){
            setShowMessage(true);
            setMessage("email format not correct!");
            return;
        }
        if(!tel.match(telPattern)){
            setShowMessage(true);
            setMessage("telephone format not correct!");
            return;
        }
        if(!location){
            setShowMessage(true);
            setMessage("Must fill in location!");
            return;
        }

        const response = await signUp(
            {username:username,
                password:password,
                location:location,
                email:email,
                tel:tel,
            });
        if(response.status === 0){
            alert('successfully create account!');
            window.location.href='/'
        }else{
            alert('create account failed!');
        }
    }

    function onSignIn(){
        setSignIn(true);
    }
    if(signIn){
        return <Redirect to='/login' />
    }

    function handleDismiss(){
        setShowMessage(false);
    }

    return(
            <div className={classes.SignUp}>
                {showMessage?
                    <Message warning className={classes.message}
                             onDismiss={handleDismiss}
                    >
                        <Message.Header>{message}</Message.Header>
                    </Message> :<></>}
                <Form className={classes.SignUpForm}>
                    <Form.Field inline>
                        <label className={classes.label}>Username:</label>
                        <input placeholder='username'
                               onChange={(event)=>{setUsername(event.target.value)}}
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <label className={classes.label}>Password:</label>
                        <input placeholder='password'
                               onChange={(event)=>{setPassword(event.target.value)}}
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <label className={classes.label}>Email:</label>
                        <input placeholder='email'
                               onChange={(event)=>{setEmail(event.target.value)}}
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <label className={classes.label}>Tel:</label>
                        <input placeholder='tel'
                               onChange={(event)=>{setTel(event.target.value)}}
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <label className={classes.label}>Location:</label>
                        <input placeholder='location'
                               onChange={(event)=>{setLocation(event.target.value)}}
                        />
                    </Form.Field>
                    <Button type='submit'
                            className={classes.SignUpButton}
                            onClick={()=>handleClick()}
                    >Sign Up</Button>
                    <Form.Field>
                        <label className={classes.SignIn} onClick={onSignIn}>Back to Login!</label>
                    </Form.Field>
                </Form>
            </div>
        )
};
