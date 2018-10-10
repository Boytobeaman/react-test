import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { NavLink } from 'react-router-dom'

import { withRouter } from 'react-router-dom'
import logo from './logo.svg';
import { connect } from 'react-redux';
import { config } from '../../config/config';
class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" className="py-0">
          <NavbarBrand href={config.APP_NAME}>
            <img src={logo} className="App-logo" alt="logo" />
            Project name
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="mr-auto">
            <NavItem>
                <NavLink to={`${config.APP_NAME}/dashboard`} className='nav-link'>Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${config.APP_NAME}/menuOne`} className='nav-link'>Menu one</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${config.APP_NAME}/menuTwo`} className='nav-link'>Menu two</NavLink>
              </NavItem>
            </Nav>
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret>
                {this.props.user.user}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.props.history.push(`${config.APP_NAME}/login`)}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


export default connect(
  state => state, null
)(Header);