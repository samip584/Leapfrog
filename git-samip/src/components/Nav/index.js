import React, {Component} from 'react'

import { connect } from 'react-redux';
import './Nav.css'
class Nav extends Component {
  render(){
    return(
      <div className='Nav__wrapper clearfix'>
        <i className = 'logo fa fa-github left'/>
        <div className = 'logo-sign left'>Github</div>
        <a className='user-options right' href = {this.props.UserData.html_url}>
          {/* <i className='options fa fa-caret-down right'/> */}
          <img className='user-img right' src = {this.props.UserData.avatar_url}/>
        </a>
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
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);