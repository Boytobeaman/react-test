import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { config } from '../../config/config';
import { getCookie,setCookie } from '../../utils';
import Header from '../header/Header';


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        debugger;
        axios
          .get(`${config.API_URL}/companies`, {
            params: {
              _sort: 'createdAt:desc' // Generates http://localhost:1337/posts?_sort=createdAt:desc
            },
            headers: {
               Authorization: 'Bearer ' + getCookie("jwt") //the token is a variable which holds the token
            }
          })
          .then(response => {
            // Handle success.
            console.log('Well done, here is the list of posts: ', response.data);
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error);
          });
    }

    render() {
        return (
            <div className="App">
                <Header history={this.props.history}/>
                <div className="page-content p-1">
                  Menu one content
                </div>
            </div>
        );
    }
}
export default connect(
    state =>({
        testValue: state.test.testValue
    })
    ,null
)(Dashboard);
