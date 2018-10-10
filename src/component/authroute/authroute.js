import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { config } from '../../config/config';
class AuthRoute extends React.Component {
    componentWillMount() {
        const publicList = [`${config.APP_NAME}/login`, `${config.APP_NAME}/register`];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1 || this.props.user.isAuth) {
            return null
        }
        debugger;
        if(!this.props.user.isAuth){
            axios.get(`${config.API_URL}${config.APP_NAME}/user/info`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data);
                    } else {
                        // window.location = `${config.APP_NAME}/login`;
                        this.props.history.push(`${config.APP_NAME}/login`);
                    }
                }else{
                    // window.location = `${config.APP_NAME}/login`;
                    this.props.history.push(`${config.APP_NAME}/login`);
                }
            })
            .catch((error)=>{
                if (error.response) {
                    console.log(error.response.data);
                    // window.location = `${config.APP_NAME}/login`;
                    this.props.history.push(`${config.APP_NAME}/login`);
                }
            });
        }else{
            this.props.history.push(`${config.APP_NAME}/login`);
        }
    }
    render() {
        return null
    }
}


export default withRouter(connect(
    state => state,
    {
        loadData
    }
)(AuthRoute));