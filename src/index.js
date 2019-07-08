import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Navbar, Nav, NavDropdown, Container,Form,FormControl,Button,ListGroup, Col, Row,Badge, Table } from 'react-bootstrap';

/*
class NavDropdownExample extends React.Component{  
    constructor(props) {
        super(props)

        this.state = {'0':'/home','1': '/dashboard','2':'/project', 
                '3':'/Template','4':'/usrmgmt','5':'/rolemgmt',
                '6':'/Eventlog','99':'/logout'}

        this.selectedKey = this.selectedKey.bind(this);    
    }

    selectedKey(e) {
        this.setstate({ 
            e  
          }); 
        alert(`selected ${this.state[e]}`)
    }

    render() {*/

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

  class Projects extends React.Component {
    render() {
        return(
            <Container fluid class="panel panel-primary">
                <Row>
                    <Col xs={6} md={4}>
                        <ListGroup variant="flush" as="ul">
                            <ListGroup.Item as="li">
                                <Form inline>                                    
                                    <Button variant="primary">Create Project</Button>                                    
                                </Form>
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="col-xs-2"/>
                                    &nbsp; <Button variant="primary">Search</Button>
                                </Form>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" disabled>
                                Project Overview
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                <span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
                                &nbsp;&nbsp; Ongoing: <Badge variant="info">2</Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" >
                                <span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span>
                                &nbsp;&nbsp;Completed: <Badge variant="danger">4</Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                <span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>
                                &nbsp;&nbsp;Archive:<Badge variant="secondary">12</Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={8}>
                        <Container fluid>
                            <Row>
                                <Col> <h3>My Projects</h3></Col>                               
                            </Row>
                            <Row> 
                                <Col style={{textAlign:"center"}}>
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#0044dd"}}></span></h1>
                                </Col> 
                                <Col style={{textAlign:"center"}}> 
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#0044dd"}}></span></h1>
                                </Col>
                                <Col style={{textAlign:"center"}}> 
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#888888"}}></span></h1>
                                </Col>                              
                            </Row>
                            <Row>
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>AZNP ULT<br/>Intro:Oct 1, 2019<br/>statu: Ongoing</h5></a>
                                </Col>                                
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>Rivers<br/>Intro:May 1, 2019<br/>statu: Ongoing</h5></a>
                                </Col>
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>Knight<br/>Intro:Apr 1, 2020<br/>statu: Completed</h5></a>
                                </Col>
                            </Row>
                            <Row> 
                                <Col style={{textAlign:"center"}}>
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#888888"}}></span></h1>
                                </Col> 
                                <Col style={{textAlign:"center"}}> 
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#888888"}}></span></h1>
                                </Col>
                                <Col style={{textAlign:"center"}}> 
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#888888"}}></span></h1>
                                </Col>                              
                            </Row>
                            <Row>
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>AZNP<br/>Intro:Oct 1, 2018<br/>statu: Completed</h5></a>
                                </Col>                                
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>Seagull/Swan<br/>Intro:May 1, 2018<br/>statu: Completed</h5></a>
                                </Col>
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>ULT<br/>Intro:Apr 1, 2017<br/>statu: Completed</h5></a>
                                </Col>
                            </Row>
                            <Row></Row>
                        </Container>
                        <Container fluid>
                            <Row>
                                <Col><h3>Watching Projects</h3></Col>
                            </Row>
                            <Row>
                                <Col style={{textAlign:"center"}}>
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#8567df"}}></span></h1>
                                </Col> 
                                <Col style={{textAlign:"center"}}> 
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#8567df"}}></span></h1>
                                </Col>
                                <Col style={{textAlign:"center"}}> 
                                <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#8567df"}}></span></h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>AZNP<br/>Intro:Oct 1, 2018<br/>statu: Completed</h5></a>
                                </Col>                                
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>Seagull/Swan<br/>Intro:May 1, 2018<br/>statu: Completed</h5></a>
                                </Col>
                                <Col style={{textAlign:"center"}}>
                                <a href="#"><h5>ULT<br/>Intro:Apr 1, 2017<br/>statu: Completed</h5></a>
                                </Col>
                            </Row>                           
                        
                        </Container>
                    </Col>
                </Row>
            </Container>
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
        alert(`Selected: ${e}, ${this.state.selectedmenu}`)       
    }

    renderNavbar() {
        return (
            <NavDropdownExample eventKey="abc" onSelect={this.selectedKey} />
        )

    }
    renderContentPage() {
        if (this.state.selectedmenu =="1")
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
        <Container fluid>            
            {this.renderNavbar()}
            {this.renderContentPage()}
        </Container>
      )
    }
  }
ReactDOM.render(
    <Mainpage />,
    document.getElementById('root'));