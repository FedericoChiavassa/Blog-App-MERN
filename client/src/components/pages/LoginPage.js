import React from 'react';
import { Container } from 'reactstrap';
import Login from '../auth/Login';
import { Link } from 'react-router-dom';

function LoginPage({history}) {
  return (     
        <Container>
            <h1>Login</h1>
            <Login history={history} />
            <p>If you don't have an account <Link to="/register">register here</Link>.</p>
        </Container>
  );
}

export default LoginPage;