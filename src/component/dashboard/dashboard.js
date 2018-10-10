import React, { Component } from 'react';
import { connect } from 'react-redux';


import Header from '../header/Header';


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }

    render() {
        return (
            <div className="App">
                <Header history={this.props.history}/>
                <div className="page-content p-1">
                  test
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
