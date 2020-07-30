import React, {Component} from 'react'
import './AddTask.css';

class AddTask extends Component{
  constructor(){
    super()
    this.state ={
      addingTask : false,
      myTask: "",
    }
  }

  AddTaskDisplay = () => {
    this.setState({
      addingTask : true,
    })
    
  }
  RemoveTaskDisplay = (e) => {
    this.setState({
      addingTask : false,
    })
    this.appendToTasks()
    e.target.value = "";
  }

  appendToTasks = () =>{
    if (this.state.myTask){
      let NewTable = this.props.table;
      NewTable[this.props.status] = [...this.props.table[this.props.status], this.state.myTask];
      this.props.setNewTable(NewTable);
    }
    
    this.setTask('');
  }

  renderbutton = () => {
    if (this.state.addingTask){
      return(
        <>
          <button className = "add__button">Add Task</button>
        </>
        )
    }
    else{
      return null;
    }
  }

  setTask = (value) =>{
    this.setState({
      myTask : value,
    })
  }
  
  render(){
    return( <>
      <textarea class = "add_task" onFocus = {(e) => {
        e.preventDefault();
        this.AddTaskDisplay()
      }}
      onBlur = {(e) => {
        e.preventDefault();
        this.RemoveTaskDisplay(e)
      }}  
      onChange = {(e) => {
        this.setTask(e.target.value)
      }}  
      
      placeholder = "+ Add a task" />
      {this.renderbutton()}
      </>
    );
  }
}

export default AddTask;