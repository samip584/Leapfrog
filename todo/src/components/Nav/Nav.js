import React, {Component} from 'react'
import './Nav.css';

class Nav extends Component{
  constructor(){
    super();
    this.state ={
      showIcon : true,
    }
  }

  renderIcon(){
    console.log(this.state.showIcon)
    if(this.state.showIcon)
      return(<i className="fa fa-search nav__search"/>);

    else  
      return(<i className="fa fa-close nav__close"/>);;
  }

  render(){
    return(
      <div className = "navigation-bar">
        <div className = "navigation-bar__container center clearfix">
          <div className = "Birallo">
          Birallo
          </div>
          <div className="navigation-bar__search__div clearfix">
            <input onFocus = {(e) => {
                e.preventDefault();
                this.setState({showIcon: false})
              }}
              onBlur = {(e) => {
                e.preventDefault();
                this.setState({showIcon: true})
              }}   className="navigation-bar__search" />
            {this.renderIcon()}
            
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;