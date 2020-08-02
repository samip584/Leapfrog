import React, {Component} from 'react'

import Loading from '../Loading'
import './Comment.css'

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const storyUrl = baseUrl + 'item/';

class  Comment extends Component{
  constructor(){
    super();
    this.state = {
      loading: true
    }
  }
  getComment(){
    fetch(storyUrl+this.props.commentId+'.json')
    .then((response) => response.json())
    .then((response) =>{
      this.setState({
        id: this.props.commentId,
        text: response.text,
        commentIds: response.kids || [],
        loading: false
      })
    })
  }

  componentDidMount(){
    this.getComment()
  }
  render(){
    if (this.state.loading){
      return <div className = 'comment__container'><p className='comment__text'><Loading/></p></div>
    }
    else{
      return(
        <div className = 'comment__container'>
          <div className='comment__text' dangerouslySetInnerHTML = {{ __html: this.state.text}} ></div>
          <div>
            {
              this.state.commentIds.map(id => {
                return <Comment key ={id} commentId = {id}/>
              })
          }</div>
        </div>
      )
    }
  }
}

export default Comment;