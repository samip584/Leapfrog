import React, {Component} from 'react'

import Loading from '../Loading'

import './Post.css'

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const storyUrl = baseUrl + 'item/';

class  Post extends Component{

  constructor(){
    super();
    this.state = {
      loading: true
    }
  }

  getPost(){
    fetch(storyUrl+this.props.id+'.json')
    .then((response) => response.json())
    .then((response) =>{
      this.setState({
        id: this.props.id,
        title: response.title,
        link: response.url,
        commentsIds: response.kids || [],
        loading: false
      })
    })
  }

  componentDidMount(){
    this.getPost()
  }

  
  render(){
    if (this.state.loading){
      return <div className='Post--container'><Loading/></div>
    }
    else{
      return(
        <div className='Post--container'>
          <a href = {this.state.link}>{this.state.title}</a>
          <div className = 'comment__button' onClick = {(e) => {this.props.toggleComment('true', this.state.commentsIds, this.state.title, this.state.link)}}>Comments</div>
        </div>
      )
    }
  }
}

export default Post;
