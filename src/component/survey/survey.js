import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Survey from 'survey-react';

import Header from '../header/Header';
import '../../assets/css/survey.css';

class SurveyComponent extends Component {
    constructor(props) {
        super(props);
        this.surveyJson = {
          questions: [
              {
                  name: "name",
                  type: "text",
                  title: "Please enter your name:",
                  placeHolder: "Jon Snow",
                  isRequired: true
              }, {
                  name: "birthdate",
                  type: "text",
                  inputType: "date",
                  title: "Your birthdate:",
                  isRequired: true
              }, {
                  name: "color",
                  type: "text",
                  inputType: "color",
                  title: "Your favorite color:"
              }, {
                  name: "email",
                  type: "text",
                  inputType: "email",
                  title: "Your e-mail:",
                  placeHolder: "jon.snow@nightwatch.org",
                  isRequired: true,
                  validators: [
                      {
                          type: "email"
                      }
                  ]
              }
          ]
      };
    }
    componentWillMount() {

    }
    sendDataToServer(survey) {
      var resultAsString = JSON.stringify(survey.data);
      alert(resultAsString); //send Ajax request to your web server.
    }
    render() {
        return (
            <div className="App">
                <Header history={this.props.history}/>
                <div className="page-content p-3">
                  <Survey.Survey json={this.surveyJson} onComplete={this.sendDataToServer} />
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
)(SurveyComponent);
