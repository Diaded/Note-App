import React, { Component } from 'react';
import Nav from './nav.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      enter: [],
      str: '',
      id: ''
    }
    this.checkNote= this.checkNote.bind(this);
    this.change= this.change.bind(this);
    this.finalChange=this.finalChange.bind(this);
  }
  componentWillMount(){
    fetch('/api')
            .then(res=> res.json())
             .then(data=> this.setState({enter: data.mess}));
         }

  checkNote(s){
    fetch('/checkNote', {
      method:'post',
      body:JSON.stringify({id:s}),
      headers:{
        "Content-Type": "application/json"
      },
    }).then(res=> res.json())
      .then(data=> this.setState({id: data._id, str: data.str}));
  }

  change(e){
    this.setState({str: e.target.value});
 }

 finalChange(){
   fetch('/changeNote', {
    method:'post',
    body:JSON.stringify({id:this.state.id, str:this.state.str}),
    headers:{
      "Content-Type": "application/json"
    },
  }).then(res=> res.json())
    .then(data=> this.setState({enter: data.mess}));
 }

  render() {
    return (
      <div className="App" onClick={this.finalChange}>

        <Nav arr={this.state.enter} check={this.checkNote=this.checkNote.bind(this)}   />
        <button>Delete</button>
        <textarea value={this.state.str} onChange={this.change} />
      </div>
    );
  }
}

export default App;
