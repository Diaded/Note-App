import React, { Component } from 'react';

class Nav extends Component{
  constructor(props){
    super(props);
    this.state={
      arr: ''
    };
    this.addNote= this.addNote.bind(this);
    this.checkNote= this.checkNote.bind(this);
  }
  addNote(){
    fetch('/add', {
      method:'post',
      body: JSON.stringify({mess: 'add new note'}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res=> res.json())
    .then(data=>window.location.reload());
  }

  checkNote(event){
    this.props.check(event.target.id);
  }

  render() {
    let coo=[];
    if(this.props.arr.length>0){
      for(var i=0; i<this.props.arr.length; i++){
          if(this.props.arr[i].str.length===0){
            coo.push(<h4 id={this.props.arr[i]._id} onClick={this.checkNote}>New Note</h4>);
          }else{
              coo.push(<h4 id={this.props.arr[i]._id} onClick={this.checkNote}>{this.props.arr[i].str.slice(0, 8)}</h4>);
          }
      }
    }


    return(
      <div id="sideNav">
        <button onClick={this.addNote}>Add note</button>
        <hr />
        {coo}
      </div>
    );
  }
}

export default Nav;
