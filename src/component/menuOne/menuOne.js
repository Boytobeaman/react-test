import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { 
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  CardTitle, 
  CardSubtitle, 
  Button 
} from 'reactstrap';
import { config } from '../../config/config';
import { getCookie,setCookie } from '../../utils';
import Header from '../header/Header';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            activeCompanyId: ''
        };
    }
    componentWillMount() {
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
            console.log('Well done, here is the list of posts: ', response.data);
            this.setState({
              companies: response.data
            })
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
                <div className="company-section">
                  <h2 className="text-center">Company Section</h2>
                    <div className="row">
                    {
                      this.state.companies.map(i=>(
                        <div className="col-sm-3 mb-1" key={i._id}>
                          <Card>
                            <CardBody>
                              <CardTitle>{i.company_name}</CardTitle>
                              <CardSubtitle>Salesmen: {i.salesmen.length}</CardSubtitle>
                              <CardSubtitle>Customers: {i.customers.length}</CardSubtitle>
                              <CardSubtitle>Inquiries: {i.inquiries.length}</CardSubtitle>
                              <Button >{i._id} See Detail</Button>
                            </CardBody>
                          </Card>
                        </div>
                        )
                      )
                    }
                    </div>
                </div>

                
                  
                  
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
