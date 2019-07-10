import React from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Container,Form,FormControl,Button,ListGroup, Col, Row,Badge, Table } from 'react-bootstrap';
import GridLayout from 'react-grid-layout';

var myprojects = [{key: 'a', projectmame: 'AZNP ULT', status: 'Ongoing', introdate: 'Oct 1, 2019', color: '#0044dd'}, 
                    {key: 'b', projectmame: 'Rivers', status: 'Ongoing', introdate: 'May 1, 2019', color: '#0044dd'},
                    {key: 'c', projectmame: 'Knight', status: 'Completed', introdate: 'Apr 1, 2018', color:'#777777'},                    
                    ]
var mywatchprojects = [{key: 'a', projectmame: 'AZNP ', status: 'Completed', introdate: 'Oct 1, 2019', color:'#777777' },
                        {key: 'b', projectmame: 'Seagull/Swan', status: 'Completed', introdate: 'Oct 1, 2019', color:'#777777'},
                        {key: 'c', projectmame: 'ULT', status: 'Completed', introdate: 'Apr 1, 2017', color:'#777777'},
                        {key: 'd', projectmame: 'AZNP', status: 'Completed', introdate: 'Oct 1, 2018', color:'#777777'},
                        {key: 'e', projectmame: 'Seagull/Swan', status: 'Completed', introdate: 'May 1, 2018', color:'#777777'},
                        {key: 'f', projectmame: 'ULT', status: 'Completed', introdate: 'Apr 1, 2017', color:'#777777'},
                    ]

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        projects: [],
        };
    }
    
    
    componentWillMount(){
       this.setState({projects: this.props.items})
    }

    render() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 1, static: true},
      {i: 'b', x: 1, y: 0, w: 1, h: 1, static: true},
      {i: 'c', x: 2, y: 0, w: 1, h: 1, static: true},
      {i: 'd', x: 3, y: 0, w: 1, h: 1, static: true},
      {i: 'e', x: 0, y: 1, w: 1, h: 1, static: true},
      {i: 'f', x: 1, y: 1, w: 1, h: 1, static: true},
    ];    
    var array=[]
    for (let i = 0; i < this.state.projects.length; i++) {
        array.push(
            <div key={this.state.projects[i].key}>
                <Row>
                    <Col style={{textAlign:"center"}}>
                        <h1><span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:"#0044dd"}}></span></h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:"center"}}><a href="#">
                        <h5>{this.state.projects[i].projectmame}<br/>Intro:{this.state.projects[i].introdate}<br/>statu:{this.state.projects[i].status}</h5></a>
                    </Col>
                </Row>
            </div>
            )
        }
    return (
        <GridLayout className="layout panel panel-default" layout={layout} cols={4} rowHeight={140} width={1200}>
            {array}        
        </GridLayout>
        )
    }
}

const  programlist = ['Tsunami','Cicada/Mantis', 'Birds','Dorado/Marlin', 'Star/Stella']

class Projects extends React.Component {
constructor(props) {
    super(props)      

    this.state = { 
        searchkeywords: '',
        findprogram: [],
    }

    this.findprogram = this.findprogram.bind(this);    
}

findprogram(){
    //alert(`Search keywords ${this.state.searchkeywords.trim()}`);
    var new_programlist = []
    for (let i = 0; i < programlist.length; i++) {
        //var a = programlist[i].match(this.state.searchkeywords.trim());
        var a = programlist[i].toLowerCase();
        var b = a.match(this.state.searchkeywords.trim());
        if (b!=null){
            new_programlist.push(programlist[i])
        }            
    }
    this.setState({findprogram: new_programlist})
    alert(this.state.findprogram)
}

renderFindProgram(){
    let array = [];       
    for (let i = 0; i < this.state.findprogram.length; i++) {
        array.push(
                    <tr>
                        <td>
                            <span class="glyphicon glyphicon-folder-open" aria-hidden="true" ></span>&nbsp;&nbsp;{this.state.findprogram[i]}
                        </td>
                    </tr>);
    }        
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Find {this.state.findprogram.length} matched programs.</th>
                </tr>
            </thead>
            <tbody> {array} </tbody>
        </Table>
    )
}

render() {
    return(
        <Container fluid>
            <Row>
                <Col xs={6} md={4}>
                    <ListGroup variant="flush" as="ul">
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
                    <ListGroup style={{textAlign: "center"}}>
                        <ListGroup.Item as="li" >
                            <Form>                                    
                                <Button variant="primary">Create Project</Button>                                    
                            </Form>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup as="ul">
                        <ListGroup.Item as="li">
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="col-xs-2"
                                onChange={(e) => {
                                    this.setState({
                                        searchkeywords: e.target.value.toLowerCase(),});
                                    }
                                }/>
                                &nbsp; <Button variant="primary" onClick={this.findprogram}>Search</Button>
                            </Form>
                        </ListGroup.Item>
                    </ListGroup>
                    {this.renderFindProgram()}
                </Col>
                <Col xs={12} md={8}>
                    <Row>
                        <Col> <h3>My Projects</h3></Col>                               
                    </Row>
                    <ProjectList items={myprojects}/>
                    <Row>
                            <Col><h3>Watching Projects</h3></Col>
                    </Row>
                    <ProjectList items={mywatchprojects}/>                                           
                </Col>
            </Row>
        </Container>
        )
    }
}

export default Projects;