import React, {Component} from 'react'

import './Nav.css'

class  Nav extends Component{
  render(){
    return( 
      <div className="Nav__wrapper">
        <div className ="Nav__container center">
          <h1>Hacker News</h1>
        </div>
      </div>
  )}
}

export default Nav;