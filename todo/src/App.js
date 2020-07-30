import React, {Component} from 'react'
import Nav from './components/Nav/Nav'
import List from './components/List/List'
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state = JSON.parse(localStorage.getItem('tasksTable')) ||{
      todo : [],
      inProcess : [],
      done : [],
    }
  }

  setNewTable= (e) =>{
    localStorage.setItem('tasksTable',  JSON.stringify(e));
    this.setState({
      todo : e.todo,
      inProcess : e.inProcess,
      done : e.done,
    })
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div className= "main center clearfix">
          <List key =  "To do" setNewTable= {this.setNewTable}  table = {this.state} status = 'todo' title = "To do"/>
          <List key = "In Process" setNewTable= {this.setNewTable}  table = {this.state} status = 'inProcess' title = "In Process"/>
          <List key = "Done" setNewTable= {this.setNewTable} status = 'done'  table = {this.state} title = "Done"/>
        </div>
      </div>
    );
  }
}

export default App;
