import React, {Component} from 'react'

import Nav from '../../components/Nav'
import AboutMe from '../../components/AboutMe'
import ReposList from '../../components/ReposList'

import './main.css'
class Main extends Component {
  render(){
    return(
      <div>
        <Nav/>
        <div className='main-container center clearfix'>
          <AboutMe />
          <ReposList />
        </div>
      </div>
    )
  }
}

export default Main;