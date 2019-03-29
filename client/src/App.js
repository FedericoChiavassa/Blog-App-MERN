import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import PrivateRoute from './components/auth/PrivateRoute';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import PostsPage from './components/pages/PostsPage';
import PostPage from './components/pages/PostPage';
import EditPostPage from './components/pages/EditPostPage';
import AboutPage from './components/pages/AboutPage';
import PageNotFound from './components/pages/PageNotFound';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
        store.dispatch(loadUser());
  }

  render() {
    return (
        <Provider store= {store}>
            <Router>
                <div className="App">
                    <AppNavbar />
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/login' component={LoginPage} />
                        <Route exact path='/register' component={RegisterPage} />
                        <Route exact path='/posts' component={PostsPage} />
                        <PrivateRoute exact path='/posts/create-post'  component={EditPostPage} />
                        <PrivateRoute exact path='/posts/:id/edit'  component={EditPostPage} />
                        <Route exact path='/posts/:id'  component={PostPage} />
                        <Route path='/about' component={AboutPage} />
                        <Route path='*' component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );    
  }
}

export default App;
