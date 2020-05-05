import React, {Component} from "react";
import {Button, Checkbox, Form, Message} from "semantic-ui-react";
import classes from "./login.module.scss";
import {signIn} from "../../api";
import storage from "../../utils/localstorage";
import {receiveUser} from "../../redux/action";
import {connect} from 'react-redux';
import {Redirect} from "react-router";


const mapStateToProps = (state:any) => ({user: state.user});

const mapDispatchToProps= (username:any, password:any)=>{
    return async (dispatch: any) => {
        const result = await signIn({username, password});
        if (result.status === 0) {
            storage.saveUser(result.user);
            dispatch(receiveUser(result.user));
        }
    }
};

class Login extends Component<{mapDispatchToProps:any,user:any}>{
    _isMounted = false;

    state={
        username:"",
        password:"",
        visible:false,
        content:false,
        agree:false,
        signUp:false,
    };

    componentDidMount() {
        this._isMounted = true;
    }


    onSignUp=()=>{
        this.setState({signUp:true});
    };

    handleClick = async ()=>{
        if(!this.state.agree){
            this.setState({content:"Please Agree with the Terms and conditions"});
            this.setState({visible: true });
            return;
        }
        await this.props.mapDispatchToProps(this.state.username, this.state.password);
        if(this._isMounted && this.props.user.get("status") !==0){
            this.setState({content:"wrong username or password!"});
            this.setState({visible:true});
            return;
        }
    };

    handleAgree = ()=>{
        this.setState({agree:true})
    };

    handleDismiss = () => {
        this.setState({ visible: false })
    };

    componentWillUnmount() {
        this._isMounted = false;
    }


    render(){
        if(this.props.user&&this.props.user.get('id')){
            return <Redirect to='/' />
        }

        if(this.state.signUp){
            return <Redirect to='/signup' />
        }

        return(
            <div className={classes.Login}>
                {this.state.visible?
                    <Message warning className={classes.message}
                             onDismiss={this.handleDismiss}
                    >
                        <Message.Header>{this.state.content}</Message.Header>
                    </Message> :<></>}
                <img className={classes.Logo} src={'/images/logo.png'} alt="logo"/>
                <Form className={classes.LoginForm}>
                    <Form.Field inline>
                        <label className={classes.label}>Username:</label>
                        <input placeholder='username'
                               onChange={(event)=>{this.setState({username:event.target.value})}}
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <label className={classes.label}>Password:</label>
                        <input placeholder='password'
                               onChange={(event)=>{this.setState({password:event.target.value})}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions'
                                  checked={this.state.agree}
                                  onChange={this.handleAgree}
                        />
                    </Form.Field>
                    <Button type='submit'
                            className={classes.LoginButton}
                            onClick={this.handleClick}
                    >Log In</Button>
                    <Form.Field>
                        <label className={classes.SignUp} onClick={this.onSignUp}>Don't have an account? Sign Up here!</label>
                    </Form.Field>
                </Form>
            </div>
        )
    }

}



export default connect(mapStateToProps, {mapDispatchToProps})(Login);
