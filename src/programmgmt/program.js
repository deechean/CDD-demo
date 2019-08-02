import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import {Form, FormControl, Button, ListGroup, Col, Row, Badge } from 'react-bootstrap'
import GridLayout  from 'react-grid-layout'
import Projectinfo from './programdetail'
import axios from 'axios'
import {getUrl} from '../common/comutil'
import Projectpenal from './programsearch'

class ProgramGrid extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        projects: [],
        };
    }

    componentDidMount(){
        console.log('this.props.items')
        console.log(this.props.items)
        this.setState({
            projects: this.props.items,
        })
    }

    render() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [];
    var array=[];
    console.log('ProjectList-render: this.state.projects.length')
    console.log(this.state.projects.length)    
    for (let i = 0; i < this.state.projects.length; i++) {
        layout.push({i:this.state.projects[i].id.toString(), x: parseInt(i%4),y: parseInt(i/4), w: 1, h: 1, static: true})
        array.push(
            <div key={this.state.projects[i].id.toString()}>
                <Row>
                    <Col style={{textAlign:"center"}}>
                        <h1>
                            <span class="glyphicon glyphicon-folder-open" 
                                aria-hidden="true" 
                                style={{color:this.state.projects[i].color}}>
                            </span>
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:"center"}}>
                        <a href="#" onClick={()=>this.props.selectProject(this.state.projects[i].id)}>
                            <h5>
                                {this.state.projects[i].name}
                                <br/>
                                Intro:{this.state.projects[i].introdate}
                                <br/>statu:{this.state.projects[i].status}
                            </h5>
                        </a>
                    </Col>
                </Row>
            </div>
            )
        }
        console.log(layout) 
        console.log(array)
    return (
        <GridLayout className="layout panel panel-default" layout={layout} cols={4} rowHeight={140} width={700}>
            {array}        
        </GridLayout>
        )
    }
}

class Projects extends React.Component {
    constructor(props) {
        super(props)      

        this.state = { 
            userid: 1,
            showProjectAll: true,
            Projectid: '1',
            myprojectsload: false,
            myprojects:[],            
            mywatchprojectsload:false,
            mywatchprojects:[],
        }
        this.selectProject = this.selectProject.bind(this);
        
    }

    componentDidMount(){
        this.querymyprogram();
    }
    
    querymyprogram(){
        console.log(getUrl('/program/findbyownerid?ownerid=')+this.state.userid);
        axios.get(getUrl('/program/findbyownerid?ownerid=')+this.state.userid).then((response)=>{           
            this.setState({
                myprojects: response.data,
                myprojectsload: true,
            });
        }).catch(function(error) {            
            console.error(error);
          });
        ;
        axios.get(getUrl('/program/findwatchprogram?userid=')+this.state.userid).then((response)=>{         
            this.setState({
                mywatchprojects: response.data,
                mywatchprojectsload: true,
            });
        }).catch(function(error) {            
            console.error(error);
          });      
    }

    selectProject(projectid){
        this.setState({
                    Projectid: projectid, 
                    showProjectAll: false,
                });
    }
    render() {
        if  (this.state.showProjectAll){
            if (this.state.myprojectsload&&this.state.mywatchprojectsload){               
            console.log('Find '+ this.state.myprojects.length+' my projects: ')
            console.log('Find '+ this.state.mywatchprojects.length+' watch projects: ')    
            return(
                <div style={{minWidth:"1000px", maxWidth:"1200px"}}>
                    <Row>
                        <Projectpenal />
                        <Col style={{width: "70%", minWidth:"680px", maxWidth:"950px"}}>
                            <Row>
                                <Col> <h3>My Projects</h3></Col>                               
                            </Row>
                            <ProgramGrid items={this.state.myprojects} selectProject={this.selectProject}/>
                            <Row>
                                <Col><h3>Watching Projects</h3></Col>
                            </Row>
                            <ProgramGrid items={this.state.mywatchprojects} selectProject={this.selectProject}/>                                                                   
                        </Col>
                    </Row>
                </div>
            )}else{
                return(
                    <div style={{minWidth:"1000px", maxWidth:"1200px"}}> Loading...</div>
                )
            }
        }else{
            return(                
                <Projectinfo programid={this.state.Projectid}/>
            )
        }
    }
}

export default Projects;