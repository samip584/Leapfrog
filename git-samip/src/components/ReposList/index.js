import React, {Component} from 'react'

import { connect } from 'react-redux';

import Repo from '../Repo'

import './RepoList.css'


import * as repoListActions from '../../actions/repoListActions'

const userReposUrl = 'https://api.github.com/users/samip584/repos'

class ReposList extends Component {
  custom_sort(a, b) {
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  } 

  componentDidMount(){
    fetch(userReposUrl)
    .then((response) => response.json())
    .then((response) =>{
      response.sort(this.custom_sort)
        this.props.setUserRepoList(response)
      })
  }
  render(){
    return(
      <div className = 'Repositories left'>
        <div className="Repositories__header clearfix">
          <h1 className='Repositories__title'>Repositories</h1><span className='Repositories__count'>{this.props.UserRepoList.length}</span>
        </div>
        {
          this.props.UserRepoList.map(repo => {
            return <Repo repo = {repo}/>
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    UserRepoList: state.userRepos.UserRepoList,
  }
}

function mapDispatchToProps(dispatch){
  return{
    setUserRepoList: (data) => dispatch(repoListActions.setUserRepoList(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReposList);