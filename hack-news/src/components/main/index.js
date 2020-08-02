import React, {Component} from 'react'

import Nav from '../Nav'
import Post from '../Post'
import Pagination from '../Pagination'
import CommentList from '../CommentList'

import './main.css'

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const newsStoryUrl = baseUrl + 'topstories.json';
const storyUrl = baseUrl + 'item/';

class Main extends Component{
  constructor(){
    super();
    this.state = {
      page : 0,
      idArray : [],
      showComment: false,
      commentIds: [],
      loading: true,
    }
  }

  toggleComment = (show, commentIdList = [], title = '', url ='') => { 
    this.setState({
      showComment: show,
      commentIds: commentIdList,
      commentPostTitle: title,
      commentUrl: url,
    })
  }

  changePage = (value) =>{
    if (this.state.page + value > 0 && this.state.page + value < this.state.idArray.length/30){
      this.setState({
        page: this.state.page + value,
      })
    }
  }
  

  getStoryIds = () => {
    fetch(newsStoryUrl)
      .then((response) => response.json())
      .then((response) =>{
        this.setState({
          idArray: response,
          loading: false,
        })
      })
  }

  loading(){
    if(this.state.loading){
      return  <p class="loading"></p>
    }
  }

  componentDidMount(){
    this.getStoryIds()
  }

  render(){
    return(
      <div>
        <Nav/>
        <div className="main-wrapper">
          <div className="main-container center">
            {this.loading()}
            {
              this.state.idArray.slice(30*this.state.page, 30 + 30*this.state.page).map(id => {
                return <Post key = {id} id = {id} toggleComment = {(show, commentIdList, title, url) => {this.toggleComment(show, commentIdList, title, url)}}/>
              })
            }
          </div>
          <Pagination page = {this.state.page} changePage = {this.changePage}/>
        </div>
        <CommentList title = {this.state.commentPostTitle} show = {this.state.showComment} commentIds = {this.state.commentIds} url ={this.state.commentUrl} toggleComment = {(show) => {this.toggleComment(show)}}/>
      </div>
    )
  }
}

export default Main;