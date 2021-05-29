import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.css';
import { config } from './config/config';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import Login from './component/login/login';
import Register from './component/register/register';
import AuthRoute from './component/authroute/authroute';
import Dashboard from './component/dashboard/dashboard';
import MenuOne from './component/menuOne/menuOne';
import Test from './component/test/index';
import UseReducer from './component/useReducer/index';
import SurveyComponent from './component/survey/survey';

const MenuTwo = () => <h3>Menu two content</h3>;

const routes = [
  {
    path: `${config.APP_NAME}/dashboard`,
    component: Dashboard,
    exact: true
  },
  {
    path: `${config.APP_NAME}/menuOne`,
    component: MenuOne,
    exact: true
  },
  {
    path: `${config.APP_NAME}/menuTwo`,
    component: MenuTwo,
    exact: true
  },
  {
    path: `${config.APP_NAME}/test`,
    component: Test,
    exact: true
  },
  {
    path: `${config.APP_NAME}/survey`,
    component: SurveyComponent,
    exact: true
  },
  {
    path: `${config.APP_NAME}/useReducer`,
    component: UseReducer,
    exact: true
  }
]

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path={`${config.APP_NAME}/login`} component={Login}></Route>
            <Route path={`${config.APP_NAME}/register`} component={Register}></Route>
            {console.log("getstate", this.props.user)}
            {
              routes.map((route, index) => {
                return (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    key={index}
                    component={route.component}
                  ></Route>
                )
              })
            }
            <Redirect to={`${config.APP_NAME}/login`} />
          </Switch>
          <Alert stack={{ limit: 3 }} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
