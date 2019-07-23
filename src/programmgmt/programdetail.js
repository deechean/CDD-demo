import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Container,Form,FormControl,Button,ListGroup, Col, Row,Badge, Table } from 'react-bootstrap'
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


class Projectderivable extends React.Component {
    constructor(props) {
        super(props)     

        this.state = { 
            programid: '-1',
            derivables: [],           
        }
    }

    componentWillMount(){
        this.setState({programid: this.props.programid, derivables: this.props.derivables})
    }

    render() {
        var layout = [];
        var array=[];
        for (let i = 0; i < this.state.derivables.length; i++) {
            layout.push({i:this.state.derivables[i].derivableid, x: parseInt(i%3),y: parseInt(i/3),w: 1, h: 1, static: true})
            array.push(
                <div key={this.state.derivables[i].derivableid}>
                    <Row>
                        <Col style={{textAlign:"center"}}>
                            <h1>
                                <span class="glyphicon glyphicon-th" aria-hidden="true" style={{color:"#0044dd"}}></span>
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign:"center"}}>
                            <a href="#" onClick={()=>this.props.selectProject(this.state.derivablename[i].derivableid)}>
                                <h5>
                                    {this.state.derivables[i].derivablename}
                                    <br/>
                                    {this.state.derivables[i].owner}
                                    <br/>
                                    {this.state.derivables[i].duedate}
                                </h5>
                            </a>
                        </Col>
                    </Row>
                </div>
                )
        }
        return(
            <Col style={{width: "40%", minWidth:"460px", maxWidth:"500px"}}>
                <div>
                    <h4>{this.state.programid} Program Derivables</h4>
                    <GridLayout className="layout panel panel-default" layout={layout} cols={3} rowHeight={140} width={460}>
                        {array}
                    </GridLayout>
                </div>
                <div>
                    <h4>{this.state.programid} Program change log</h4>
                    <Table>

                    </Table>
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
                    <Projectderivable programid={this.state.programid} derivables={derivableslist}/>
                    <Projectdetail programid={this.state.programid}/>
                </Row>  
            </div>   
        )
    }
}

const  derivableslist = [{derivableid: '0001', derivablename: 'User Guide', owner:'Liu Xia', duedate: '2019/07/16', versionid: ''},
                        {derivableid: '0002', derivablename: 'Setup Poster', owner:'Hu Jun', duedate: '2019/06/8', versionid: ''},
                        {derivableid: '0003', derivablename: 'Warranty Card', owner:'Sunny Yuan', duedate: '2019/06/16', versionid: ''},
                        ]
export default Projectinfo;