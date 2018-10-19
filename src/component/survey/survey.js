import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Survey from 'survey-react';
import Alert from 'react-s-alert';
import axios from 'axios';
import { config } from '../../config/config';
import _ from 'lodash';

import Header from '../header/Header';
import '../../assets/css/survey.css';

class SurveyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: {}
        }
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
        axios.get(`${config.API_URL}${config.APP_NAME}/surveys`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    let the_survey_obj = _.find(res.data,{name:"pwc survey"})
                    if (the_survey_obj) {
                        let survey_json_obj = the_survey_obj.survey_pure_json
                        this.setState({ survey: survey_json_obj })
                    }
                }
            })
            .catch((res) => {
                console.log('失败')
                Alert.error(res.message, {})
            })
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
                  <Survey.Survey json={this.state.survey} onComplete={this.sendDataToServer} />
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
