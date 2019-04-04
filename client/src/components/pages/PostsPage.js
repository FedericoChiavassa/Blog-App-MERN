import React from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PostsList from '../PostsList';

function PostsPage({ auth }) {
  const button = (
    <Button
        tag={Link}
        to={{
            pathname: '/posts/create-post',
            state: { from: '/posts' }
        }}
        className="float-right"
        color="primary"
    >+ New Post</Button>
  );

  return (   
    <Container>
        <h1 className="mb-4 d-inline-block">Posts</h1>
        {auth.isAuthenticated ? button : null}
        <PostsList />
    </Container>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PostsPage);