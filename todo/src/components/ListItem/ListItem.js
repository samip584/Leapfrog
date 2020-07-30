import React, {Component} from 'react'
import './ListItem.css';

class ListItem extends Component{
  deleteTask = () =>{
    let newTable = this.props.table;
    newTable[this.props.status] =newTable[this.props.status].filter(task => task !== this.props.task)
    this.props.setNewTable(newTable);
  }

  changeStatus( toState){
    let newTable = this.props.table
    newTable[this.props.status] = newTable[this.props.status].filter(task => task !== this.props.task)
    newTable[toState].push(this.props.task)
    this.props.setNewTable(newTable)
  }
  
  render(){
    return(
      <li className = "list__content">
        <div className = "task__text">{this.props.task}</div>
        <div className = "task__options clearfix">
          <div className = "update_task"><i class = "fa fa-pencil"></i></div>
          <div className = "delete_task" onClick={(e) => {this.deleteTask()}}><i class = "fa fa-trash"></i></div>
          <select className="status">
            <option value="0">Status</option>
            <option value="1" onClick={(e) => {this.changeStatus('todo')}}>To Do</option>
            <option value="2" onClick={(e) => {this.changeStatus('inProcess')}}>In Process</option>
            <option value="3" onClick={(e) => {this.changeStatus('done')}}>Done</option>
          </select>
        </div>
      </li>
    );
  }
}

export default ListItem;