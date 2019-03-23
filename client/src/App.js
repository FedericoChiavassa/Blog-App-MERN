import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import PostsPage from './components/pages/PostsPage';
import AboutPage from './components/pages/AboutPage';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <AppNavbar />
                <Route exact path='/' component={HomePage} />
                <Route path='/posts' component={PostsPage} />
                <Route path='/about' component={AboutPage} />
            </div>
        </Router>
    );    
  }
}

export default App;
