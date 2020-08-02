import React, {Component} from 'react'

import './Pagination.css'

class  Pagination extends Component{
  render(){
    return(
      <div className = "pagination__container center clearfix">
        <span className='change-page' onClick = {(e) => {this.props.changePage(-1)}}> <i className='fa fa-caret-left'/> </span>
        <span className = 'page-no'>{this.props.page + 1}</span>
        <span className='change-page' onClick = {(e) => {this.props.changePage(1)}}> <i className='fa fa-caret-right'/> </span>
      </div>
    ) 
  }
}

export default Pagination;