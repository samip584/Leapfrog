import React, {Component} from 'react'
import Comment from '../Comment'

import './CommentList.css'


class  CommentList extends Component{

  closeList(e){
    if(e.target.className === 'comment-list__wrapper'){
      this.props.toggleComment(false)
    }
  }

  escFunction = (event) => {
    if(event.keyCode === 27) {
      this.props.toggleComment(false)
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
  render(){
    if(this.props.show){
      return(
        <div className = 'comment-list__wrapper' onClick = {(e) => this.closeList(e)}>
          <div className = 'comment-list__container'>
            <i className='fa fa-times-circle close__list' onClick = {(e) => this.props.toggleComment(false)}></i>
            <a href={this.props.url}><h2>{this.props.title}</h2></a>
            <h3>Comments</h3>
            {this.props.commentIds.map(id => {
              return <Comment key ={id} commentId = {id}/>
            })}
          </div>
        </div>
      ) 
    }
    else{
      return null;
    }
  }
}

export default CommentList;