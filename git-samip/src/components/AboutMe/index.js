import React, {Component} from 'react'

import { connect } from 'react-redux';

import './AboutMe.css'

import * as userActions from '../../actions/userActions'

const userUrl = 'https://api.github.com/users/samip584'

class Main extends Component {
  componentDidMount(){
    fetch(userUrl)
    .then((response) => response.json())
    .then((response) =>{
        this.props.setData(response)
      })
  }
  render(){
    return(
      <div className="AboutMe-container left">
        <img className='profile-pic' src = {this.props.UserData.avatar_url}/>
        <h1 className='User-name'>{this.props.UserData.name}</h1>
        <div className='User-login'>{this.props.UserData.login}</div>
        <span className='User-info'><span className='User-info-num'>{this.props.UserData.followers} </span>followers </span>
        <span className='User-info'><span className='User-info-num'>{this.props.UserData.following}</span> following </span>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    UserData: state.user.UserData,
  }
}

function mapDispatchToProps(dispatch){
  return{
    setData: data => {
      dispatch(userActions.setUserData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);