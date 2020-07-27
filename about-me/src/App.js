import React from 'react';
import logo from './logo.svg';
import './App.css';

function Name(){
  return <div className="userName">Samip Shrestha</div>
}

function Interests(){
  return (
    <ul className="userInterests">
      <li className="userInterest">Python</li>
      <li className="userInterest">•</li>
      <li className="userInterest">Machine Learning</li>
      <li className="userInterest">•</li>
      <li className="userInterest">Data Analysis</li>
      <li className="userInterest">•</li>
      <li className="userInterest">Software Development</li>
    </ul>
  );
}

function Socials(){
  return (
    <ul className="userSocials">
      <li className="userSocial"><a target="_blank" href = 'https://www.instagram.com/samip584/' title = 'instagram'>  <i className = "fa fa-instagram"/></a></li>
      <li className="userSocial"><a target="_blank" href = 'https://www.facebook.com/samip.shrestha.1654' title = 'facebook'><i className = "fa fa-facebook"/></a></li>
      <li className="userSocial"><a target="_blank" href = 'https://github.com/samip584/' title = 'github'><i className = "fa fa-github"/></a></li>
      <li className="userSocial"><a target="_blank" href = 'https://www.linkedin.com/in/samip-shrestha/' title = 'linkedin'><i className = "fa fa-linkedin"/></a></li>
      <li className="userSocial"><a target="_blank" href = 'mailto:samip0884@gmail.com'><i className = "fa fa-envelope" title = 'Email'/></a></li>
    </ul>
  );
}

function App() {
  return (
    <div className="App">
      <Name />
      <Interests />
      <Socials />
    </div>
  );
}

export default App;
