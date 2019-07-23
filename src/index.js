import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import Projects from './programmgmt/program';



    function NavDropdownExample(props){
        return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="#home" >
                <img src="./images/hp-logo.gif" width="30" height="30" class="d-inline-block align-top" alt="React Bootstrap logo"/>                   
            </Navbar.Brand>
            <br />
            <Navbar.Brand>CDD</Navbar.Brand>
            <br />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav navbar className="mr-auto" onSelect={props.onSelect}>
                    <Nav.Link eventKey="1" >Dashboard</Nav.Link>
                    <Nav.Link eventKey="#">&nbsp;</Nav.Link>
                    <Nav.Link eventKey="2">Project</Nav.Link>
                    <Nav.Link eventKey="#">&nbsp;</Nav.Link>
                    <Nav.Link eventKey="3">Template Link</Nav.Link>
                    <Nav.Link eventKey="#">&nbsp;</Nav.Link>
                    <NavDropdown title="System Management" id="basic-nav-dropdown">
                        <NavDropdown.Item eventKey="4">User Managment</NavDropdown.Item>
                        <NavDropdown.Item eventKey="5">Role Management</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="6">Eventlog</NavDropdown.Item>                        
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />        
            <Navbar.Text>Login as: Mark Tunning</Navbar.Text>              
            <Navbar.Collapse className="justify-content-end">
                <Nav navbar className="mr-auto" onSelect={props.onSelect}>                    
                    <Nav.Link eventKey="99">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse> 
        </Navbar>
        )
    }

  class Dashboard extends React.Component {
    render() {
        return (
          <div className="div-bg div-contains dashboard">	
              <div className="row">
                  <div className="col-md-2">
                  </div>		
                  <div className="col-md-8 dashboard">	
                      <h2>Welcome to CDD Program Dashboard</h2>				
                      <h4>Update: 2019/7/8</h4>
                      <p></p>
                      <li>Some update or information here.</li>
                      <li>DEMO: The shipment forecast is based on Q2’19 LTP (link).</li>			
                      <li>DEMO: Given the dynamic nature of WIB for Print PLs (which depend on the summing of warranty units), PL-level WIB reporting out of WARF18 will not reflect true WIB at Product line level.  We’ll need to wait for WARF19 to see the historical restatements incorporated.</li>
                      <li>DEMO: As of today, we are waiting for APJ to close out the $176K repair data load for A3 Growth LaserJet Printers in WARF.</li>
                  </div>								
              </div>
          </div>
        )
    }
  }
  
  class Mainpage extends React.Component {
    constructor(props) {
        super(props)

        var mainpagelist = {'0':'/home','1': '/dashboard','2':'/project', 
                '3':'/Template','4':'/usrmgmt','5':'/rolemgmt',
                '6':'/Eventlog','99':'/logout'}

        this.state = { 
             selectedmenu: '0',
        }

        this.selectedKey = this.selectedKey.bind(this);    
    }

    selectedKey(e) {
        this.setState({selectedmenu: e});
        //alert(`Selected: ${e}, ${this.state.selectedmenu}`)       
    }

    renderNavbar() {
        return (
            <NavDropdownExample eventKey="abc" onSelect={this.selectedKey} />
        )

    }
    renderContentPage() {
        if (this.state.selectedmenu == "1")
            return (
                <Dashboard />
            )
        else if (this.state.selectedmenu =="2")      
            return (
                <Projects />
            )
    }

    render() {
      return (  
        <Container fluid style={{minWidth:"1000px", maxWidth:"1200px"}}>            
            {this.renderNavbar()}
            {this.renderContentPage()}
        </Container>
      )
    }
  }
  
  ReactDOM.render(
    <Mainpage />,
    document.getElementById('root'));