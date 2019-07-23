import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import {Form, FormControl, Button, ListGroup, Col, Row, Badge } from 'react-bootstrap'
import GridLayout  from 'react-grid-layout'
import Projectinfo from './programdetail'
import axios from 'axios'
import {getUrl} from '../common/comutil';

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
                            <span class="glyphicon glyphicon-folder-open" aria-hidden="true" style={{color:this.state.projects[i].color}}></span>
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:"center"}}>
                        <a href="#" onClick={()=>this.props.selectProject(this.state.projects[i].id)}>
                            <h5>
                                {this.state.projects[i].programname}
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

class Projectpenal extends React.Component {
    constructor(props) {
        super(props)      
    
        this.state = { 
            searchkeywords: '',
            findprogram: [],
        }
    
        this.findprogram = this.findprogram.bind(this); 
        this.addwatch = this.addwatch.bind(this); 

    }

    findprogram(){
        if (this.state.searchkeywords.length != 0){
            var new_programlist = []
            for (let i = 0; i < programlist.length; i++) {
                
                var a = programlist[i].projectmame.toLowerCase();
                var b = a.match(this.state.searchkeywords.trim());
                if (b!=null){
                    new_programlist.push(programlist[i])
                }            
            }
            this.setState({findprogram: new_programlist})
        }
    }

    addwatch(program_key){
        //alert(program_key);
    }

    renderFindProgram(){
        let array = [];  
        let layout= [];  
        array.push(
            <div key={'-1'} >
                Find {this.state.findprogram.length} matched programs.
            </div>)   
        for (let i = 0; i < this.state.findprogram.length; i++){
            layout.push({i: i, x: i, y: 0, w: 1, h: 1})
        
            array.push(
                    <ListGroup.Item as="li">
                        <span class="glyphicon glyphicon-folder-open" aria-hidden="true" >
                        </span>&nbsp;&nbsp;{this.state.findprogram[i].projectmame}&nbsp;&nbsp;
                        <Button id = {this.state.findprogram[i].programid} variant="primary" style={{float: "right"}} disabled={this.state.findprogram[i].flag_watch||this.state.findprogram[i].flag_owner ? true: false} 
                            onClick={(e) => this.addwatch(this.state.findprogram[i].programid)}>
                            <span class="glyphicon glyphicon-plus" aria-hidden="true" ></span>
                        </Button>
                    </ListGroup.Item>
            )
        }

        return(
            <ListGroup as="ul">
                {array}
            </ListGroup>            
        )
    }

    render(){
        return (
        <Col style={{width: "30%", minWidth:"320px", maxWidth:"350px"}}>
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
        </Col>)
    }
}

class Projects extends React.Component {
    constructor(props) {
        super(props)      

        this.state = { 
            userid: 1,
            showProjectAll: true,
            Projectid: '0000',
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
                            <ProgramGrid items={this.state.mywatchprojects} selectProject={this.selectProject}/>>                                                                     
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

const  programlist = [{programid: '0001', projectmame: 'AZNP ULT', status: 'Ongoing', introdate: 'Oct 1, 2019', flag_owner:true, flag_watch: false,  color: '#0044dd'}, 
                        {programid: '0002', projectmame: 'Rivers', status: 'Ongoing', introdate: 'May 1, 2019', flag_owner:true, flag_watch: false, color: '#0044dd'},
                        {programid: '0003', projectmame: 'Knight', status: 'Completed', introdate: 'Apr 1, 2018', flag_owner:true, flag_watch: false, color:'#777777'},
                        {programid: '0004', projectmame: 'AZNP ', status: 'Completed', introdate: 'Oct 1, 2019', flag_owner:false, flag_watch: true, color:'#777777' },
                        {programid: '0005', projectmame: 'Seagull/Swan', status: 'Completed', introdate: 'Oct 1, 2019', flag_owner:false, flag_watch: true, color:'#777777'},
                        {programid: '0006', projectmame: 'ULT', status: 'Completed', introdate: 'Apr 1, 2017', flag_owner:false, flag_watch: false, color:'#777777'},
                        {programid: '0007', projectmame: 'Mama', status: 'Completed', introdate: 'Oct 1, 2018', flag_owner:false, flag_watch: false, color:'#777777'},
                        {programid: '0008', projectmame: 'Mantis/LonePine', status: 'Completed', introdate: 'May 1, 2018', flag_owner:false, flag_watch: false, color:'#777777'},
                        {programid: '0009', projectmame: 'ULT', status: 'Completed', introdate: 'Oct 1, 2017', flag_owner:false, flag_watch: false, color:'#777777'},
                        {programid: '0010', projectmame: 'Cicada/Tsunami', status: 'Completed', introdate: 'Dec 1, 2017', flag_owner:false, flag_watch: false, color:'#777777'},
                        {programid: '0011', projectmame: 'Astro', status: 'Completed', introdate: 'Apr 1, 2017',flag_owner:false, flag_watch: false,  color:'#777777'},
                        {programid: '0012', projectmame: 'Birds', status: 'Completed', introdate: 'Nov 1, 2015',flag_owner:false, flag_watch: false,  color:'#777777'},
                        {programid: '0013', projectmame: 'Dorado/Marlin', status: 'Completed', introdate: 'Nov 1, 2014', flag_owner:false, flag_watch: false, color:'#777777'},
                        {programid: '0014', projectmame: 'Star/Stella', status: 'Completed', introdate: 'Jun 1, 2012', flag_owner:false, flag_watch: false, color:'#777777'},]

export default Projects;