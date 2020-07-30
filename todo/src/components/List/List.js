import React, {Component} from 'react'
import ListItem from '../ListItem/ListItem'
import AddTask from '../AddTask/AddTask'
import './List.css';

class List extends Component{
  // constructor(){
  //   super();
  //   this.title = this.props.title
  //   this.tasks = this.props.tasks;
  // }

  render(){
    return(
      <div className = "list">
        <span className = "list__title">{this.props.title}</span>
        <ul className = "list__contents">
          {
            this.props.table[this.props.status].map((task, index) => {
              return <ListItem key = {index} task = {task} status = {this.props.status} setNewTable= {this.props.setNewTable} table={this.props.table}/>
            })
          }
        </ul>
        <AddTask status = {this.props.status} setNewTable= {this.props.setNewTable} table={this.props.table}/>
      </div>
    );
  }
}

export default List;