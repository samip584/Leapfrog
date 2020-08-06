import React, {Component} from 'react'

import './Repo.css'

class Repo extends Component {
  constructor(){
    super()
    this.state = {
      last_updated : '',
      max_descripton_display: 197,
      description: "",
    }
  }
  componentDidMount(){
    let date = new Date(this.props.repo.pushed_at).getTime()
    let diff = (new Date() - date) / (1000)
    if(diff < 60){
      this.setState({
        last_updated : parseInt(diff) + ' seconds ago'
      })
    }
    else if(diff < 60*60){
      this.setState({
        last_updated : parseInt(diff / 60) + ' minutes ago'
      })
    }
    else if(diff < 60*60*60){
      this.setState({
        last_updated : parseInt(diff/(60*60)) + ' hours ago'
      })
    }
    else if(diff < 60*60*60*12){
      this.setState({
        last_updated : parseInt(diff/(60*60*24)) + ' days ago'
      })
    }
    else{
      this.setState({
        last_updated : ' on ' + this.props.repo.updated_at.slice(0, 10)
      })
    }

    if(this.props.repo.description && this.props.repo.description.length>this.state.max_descripton_display){
      this.setState({
        description : this.props.repo.description.slice(0,this.state.max_descripton_display) + '...',
      })
    }
    else{
      this.setState({
        description : this.props.repo.description,
      })
    }
  }
  render(){
    
    return(
      <div className = "repo">
        
        <div className='Repositories__container'>
          <a className = "repo-title" href={this.props.repo.html_url}>
            {this.props.repo.name}
          </a>
          <p className = "repo-description">{this.state.description}</p>
          <span className = "repo-language">{this.props.repo.language}</span>
          <span className = "repo-last-updated"> Updated {this.state.last_updated}</span>
        </div>
      </div>
    )
  }
}

export default Repo;