import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import PostsPage from './components/pages/PostsPage';
import PostPage from './components/pages/PostPage';
import AboutPage from './components/pages/AboutPage';


import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
        <Provider store= {store}>
            <Router>
                <div className="App">
                    <AppNavbar />
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/posts' component={PostsPage} />
                    <Route path='/posts/:id'  component={PostPage} />
                    <Route path='/about' component={AboutPage} />
                </div>
            </Router>
        </Provider>
    );    
  }
}

export default App;
