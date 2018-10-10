import React from 'react';
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './login.css';
import { 
    Button,
    Form,
    FormGroup,
    Label, 
    Input 
} from 'reactstrap';
import { config } from '../../config/config';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            user: '',
            pwd: ''
        }
    }
    register() {
        this.props.history.push(`${config.APP_NAME}/register`);
        // window.location = `${config.APP_NAME}/register`;
    }
    handleChange(key, e) {
        this.setState({
            [key]: e.target.value
        })
    }
    handleLogin() {
        this.props.login(this.state)
    }
    render() {
        return (
            <div>
                {(this.props.redirectTo && this.props.redirectTo !== `${config.APP_NAME}/login`) ? <Redirect to={this.props.redirectTo} /> : null}
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
                            <Button outline color="secondary" onClick={this.handleLogin}>login</Button>
                            <Button color="link" className="float-right login-change-link" onClick={this.register}>register</Button>
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
        login
    }
)(Login);