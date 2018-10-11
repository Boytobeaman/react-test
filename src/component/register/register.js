import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../redux/user.redux';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { config } from '../../config/config';
import '../login/login.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: ''
        };
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(key, e) {
        console.log(key,e);
        this.setState({
            [key]: e.target.value
        })
    }
    handleRegister() {
        console.log("to register")
        this.props.register(this.state);
    }
    login() {
        // window.location = `${config.APP_NAME}/login`
        this.props.history.push(`${config.APP_NAME}/login`);
    }
    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <div className="d-flex justify-content-center align-items-center sign-up-wrap">
                    <div>
                        <h3 className="text-center">Project Name</h3>
                        <Form className="p-3">
                            {this.props.msg ? <p className="text-danger font-weight-bold">{this.props.msg}</p> : null}
                            <FormGroup>
                                <Label for="UserName">User Name</Label>
                                <Input
                                    name="UserName"
                                    id="UserName"
                                    onChange={e => this.handleChange('user', e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    onChange={e => this.handleChange('pwd', e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    onChange={e => this.handleChange('repeatpwd', e)}
                                />
                            </FormGroup>
                            <Button color="danger" onClick={this.handleRegister}>Register</Button>
                            <Button color="link" className="float-right login-change-link" onClick={this.login}>login</Button>
                        </Form>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    {
        register
    }
)(Register);