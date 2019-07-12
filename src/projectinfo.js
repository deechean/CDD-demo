import React from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Container,Form,FormControl,Button,ListGroup, Col, Row,Badge, Table } from 'react-bootstrap';
import GridLayout  from 'react-grid-layout';

class Projectmember extends React.Component {
    constructor(props) {
        super(props)      

        this.state = { 
            programid: '-1',
            memberlist:['Zhang, Monica (LES-CA-Shanghai)', 
                        'Fang, Elaine (CW-LES-CA-Data-Analyst)',
                        'Robles, Antonina',],
        }
    }
    componentWillMount(){
        this.setState({programid: this.props.programid})
     }
    renderMembers(){
        var array = []
        for (let i = 0; i < this.state.memberlist.length; i++){
            array.push( 
            <ListGroup.Item as="li" >
                <h6><span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                &nbsp;{this.state.memberlist[i]}
                <Button className="btn" size="xs" style={{float: "right"}}>
                    <span class="glyphicon glyphicon-minus" aria-hidden="true" ></span>
                </Button>
                </h6>
            </ListGroup.Item>
            )
        }
        return(
            array 
        )
    }
    render() {
        return(
            <Col style={{width: "30%", minWidth:"320px", maxWidth:"350px"}}>
                <ListGroup variant="flush" as="ul">
                    <ListGroup.Item as="li">   
                        <h4>Program Members 
                        <Button size="xs" style={{float: "right"}}>
                            <span class="glyphicon glyphicon-plus" aria-hidden="true" ></span>
                        </Button> </h4>
                    </ListGroup.Item>
                    {this.renderMembers()}
                </ListGroup>               
            </Col>
        )   }
}

class Projectderiverable extends React.Component {
    constructor(props) {
        super(props)      

        this.state = { 
            programid: '-1'
        }
    }
    componentWillMount(){
        this.setState({programid: this.props.programid})
     }
    render() {
        return(
            <Col style={{width: "40%", minWidth:"460px", maxWidth:"500px"}}>
                <div className="panel panel-default">
                    <h3>{this.state.programid} Program Derivables</h3>
                </div>
            </Col>
        )
    }
}

class Projectdetail extends React.Component {
    constructor(props) {
        super(props)      

        this.state = { 
            programid: '-1'
        }
    }
    componentWillMount(){
        this.setState({programid: this.props.programid})
     }
    render() {
        return(
            <Col style={{width: "30%", minWidth:"320px", maxWidth:"350px"}}>
                <div className="panel panel-default">
                    <h3>{this.state.programid} Information</h3>
                </div>
            </Col>
        )
    }
}

class Projectinfo extends React.Component {
    constructor(props) {
        super(props)      

        this.state = { 
            programid: '-1'
        }
    }
    componentWillMount(){
        this.setState({programid: this.props.programid})
     }
    render() {

        return(
            <div style={{minWidth:"1000px", maxWidth:"1200px"}}>     
                <Row>         
                    <Projectmember programid={this.state.programid}/>
                    <Projectderiverable programid={this.state.programid}/>
                    <Projectdetail programid={this.state.programid}/>
                </Row>  
            </div>   
        )
    }
}

export default Projectinfo;