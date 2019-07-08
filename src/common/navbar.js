import React from 'react'
import ReactDOM from 'react-dom'
import { Nav, NavItem, NavDropdown, Dropdown.Item } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css';

class NavDropdownExample extends React.Component{   
  render() {
    return (
      <Container>
          <Navbar bg="light" expand="lg" fixed="top">
              <Navbar.Brand href="#home" >
                  <img src="./images/hp-logo.gif" width="30" height="30" class="d-inline-block align-top" alt="React Bootstrap logo"/>                   
              </Navbar.Brand>
              <br />
              <Navbar.Brand>CDD</Navbar.Brand>
              <br />
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav navbar className="mr-auto">
                      <Nav.Link href="#home">Dashboard</Nav.Link>
                      <Nav.Link href="#">&nbsp;</Nav.Link>
                      <Nav.Link href="#link-1">Project</Nav.Link>
                      <Nav.Link href="#">&nbsp;</Nav.Link>
                      <Nav.Link href="#link-2">Template Link</Nav.Link>
                      <Nav.Link href="#">&nbsp;</Nav.Link>
                      <NavDropdown title="System Management" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">User Managment</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Role Management</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.3">Eventlog</NavDropdown.Item>                        
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse> 
              <Navbar.Toggle aria-controls="basic-navbar-nav" />        
              <Navbar.Text>Login as: Mark Tunning</Navbar.Text>              
              <Navbar.Collapse className="justify-content-end">
                  <Nav navbar className="mr-auto">                    
                      <Nav.Link href="#link">Logout</Nav.Link>
                  </Nav>
              </Navbar.Collapse> 
          </Navbar>
      </Container>
    )
  }
};
export default NavDropdownExample;
  