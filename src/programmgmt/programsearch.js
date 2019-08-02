import React from 'react'
import '../index.css'
import './programsearch.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import {Form, Button, ListGroup, Col, Row, Badge } from 'react-bootstrap'
import {getUrl} from '../common/comutil'
import Autosuggest from 'react-autosuggest'
import axios from 'axios';



class Autosuggest2 extends React.Component {
    constructor(props) {
        super(props)     
    
        this.state = { 
            url: '',
            placeholder: '',
            options: [],
            value: '',            
            suggestions:[],
        }    
    }

    componentWillMount(){
        this.setState({
            url: this.props.url,
            placeholder: this.props.placeholder,
        })
    }
    componentDidMount(){              
        axios.get(getUrl(this.state.url)).then((response)=>{ 
            this.setState({                
                options: response.data,                
            });
        }).catch((error)=>{            
            console.error(error);
        });
        
    }

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        
        this.setState({
        suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        console.log(this.state.options.length)        

        return inputLength === 0 ? [] : this.state.options.filter(suggest=>
            suggest.name.toLowerCase().slice(0, inputLength) === inputValue);
    };

    getSuggestionValue = suggestion => suggestion.name;    

    renderSuggestion(suggestion){
        return(
            <div >
                {suggestion.name}
            </div>
        )
        }

    render(){
        const value = this.state.value;
        const inputProps = {
            placeholder: this.state.placeholder,
            value,
            onChange: this.onChange
          };
        
        return(
        <Autosuggest
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
        />)
    }

}

class Projectpenal extends React.Component {
    constructor(props) {
        super(props)      
    
        this.state = { 
            userearchkey: '',
            findprogram: [],
            programs: [],   
            watchprograms: [],         
        }
    
        this.findprogram = this.findprogram.bind(this); 
        this.addwatch = this.addwatch.bind(this); 
        this.programkeyref = React.createRef();
        this.userkeyref = React.createRef();
    }

    componentDidMount(){
          axios.get(getUrl('/program/findallprogram')).then((response)=>{           
            this.setState({                
                programs: response.data,                
            });
        }).catch((error)=>{            
            console.error(error);
          });
    }

    findprogram(){
        var new_programlist = []
        let programsearchkey= this.programkeyref.current.state.value.toLowerCase()
        if(programsearchkey.length != 0 ){            
            for (let i = 0; i < this.state.programs.length; i++) {     
                console.log('ownername:'+this.state.programs[i].ownername)
                var a = this.state.programs[i].name.toLowerCase();
                var b = a.match(programsearchkey.trim());
                if (b!=null){
                    new_programlist.push(this.state.programs[i])
                }            
            }
        }else{
            this.state.programs.map((programs)=>{new_programlist.push(programs)})
        }
        
        let new_programlist2=[]
        let userearchkey = this.userkeyref.current.state.value.toLowerCase()
        if(userearchkey.length != 0){
            for (let i = 0; i < new_programlist.length; i++) {                
                var a = new_programlist[i].name.toLowerCase();
                var b = a.match(userearchkey.trim());
                if (b!=null){
                    new_programlist2.push(this.state.programs[i])
                }            
            }
        }else{
            new_programlist.map((programs)=>{new_programlist2.push(programs)})
        }

        this.setState({findprogram: new_programlist2})
    }

    addwatch(program_key){
        alert(this.props.state)
        /*
        for (let i=0; i < this.props.state.mywatchprojects.length; i++){
            if (program_key == this.props.state.mywatchprojects[i].id ){
                alert("The program you select has already under your watch.")
            }
        }*/
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
                        <table> 
                            <tbody>
                                <tr style={{fontSize: "14px"}}>
                                    <td rowspan ="3">
                                        <span 
                                            class="glyphicon glyphicon-folder-open" 
                                            aria-hidden="true" 
                                            style={{color: this.state.findprogram[i].color}}></span>
                                    </td>
                                    <td >{this.state.findprogram[i].name}</td>
                                    <td rowspan ="3">
                                        <Button id = {this.state.findprogram[i].id} variant="primary" 
                                            style={{float: "right"}} 
                                            disabled={this.state.findprogram[i].flag_watch||this.state.findprogram[i].flag_owner ? true: false} 
                                            onClick={(e) => this.addwatch(this.state.findprogram[i].id)}>
                                            <span class="glyphicon glyphicon-plus" aria-hidden="true" ></span>
                                        </Button>
                                    </td>
                                </tr>
                                <tr>                                     
                                    <td> 
                                        Owner:{this.state.findprogram[i].ownername}
                                    </td>
                                </tr>  
                                <tr>                                    
                                    <td> 
                                        Status:{this.state.findprogram[i].status}
                                    </td>
                                </tr>                                 
                            </tbody>
                        </table>
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
                   My Program Overview
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
                        <Button variant="primary">New Project</Button>                                    
                    </Form>
                </ListGroup.Item>
            </ListGroup>
            <ListGroup as="ul">
                <ListGroup.Item as="li">
                    <Form>
                        <Form.Group as={Row} controlId="Programkeywords">
                            <Form.Label column sm="3">Program&nbsp;</Form.Label>
                            <Col sm="9">
                                <Autosuggest2 
                                    id = "programsearchkeyinput"
                                    ref = {this.programkeyref}
                                    url="/program/findallprogram" 
                                    placeholder="Input a program name"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} ControlId="Ownerkeywords" >
                            <Form.Label column sm="3">Owner&nbsp;</Form.Label>
                            <Col sm="9">
                                <Autosuggest2 
                                    id="userearchkeyinput"
                                    ref = {this.userkeyref}
                                    url="/user/fildallusers" 
                                    placeholder="Input a name"/>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" onClick={this.findprogram}>Search Program</Button>                        
                    </Form>
                </ListGroup.Item>
            </ListGroup>
            {this.renderFindProgram()}            
        </Col>)
    }
}
export default Projectpenal;