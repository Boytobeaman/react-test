import React from 'react';
import { login, fake_login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { 
    Button,
    Form,
    FormGroup,
    Label, 
    Input 
} from 'reactstrap';
import { config } from '../../config/config';

function Index (props){

  return (
    <div>
      Test page
    </div>
  )
}


export default connect(
    state => state.user,
    {
        login,
        fake_login
    }
)(Index);