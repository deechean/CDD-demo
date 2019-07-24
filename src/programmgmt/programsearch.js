import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import {Form, FormControl, Button, ListGroup, Col, Row, Badge } from 'react-bootstrap'
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
             
            console.log('Projectpenal--get programs')  
            /* 
            let array = response.data.map(function(data,index){
                return data.name;
            });
            */
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
            searchkeywords: '',
            findprogram: [],
            programs: [],            
        }
    
        this.findprogram = this.findprogram.bind(this); 
        this.addwatch = this.addwatch.bind(this); 
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
        if (this.state.searchkeywords.length != 0){
            var new_programlist = []
            for (let i = 0; i < this.state.programs.length; i++) {                
                var a = this.state.programs[i].name.toLowerCase();
                var b = a.match(this.state.searchkeywords.trim());
                if (b!=null){
                    new_programlist.push(this.state.programs[i])
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
                                <Autosuggest2 url="/program/findallprogram" placeholder="Input a program name" onChange=""/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} ControlId="Ownerkeywords" >
                            <Form.Label column sm="3">Owner&nbsp;</Form.Label>
                            <Col sm="9">
                                <Autosuggest2 url="/user/fildallusers" placeholder="Input a name"/>
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