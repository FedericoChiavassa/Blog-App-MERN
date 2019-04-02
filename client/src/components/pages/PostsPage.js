import React from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PostsList from '../PostsList';

function PostsPage({ auth }) {
  const button = (
    <Button
        tag={Link}
        to="/posts/create-post"
        className="mt-4 mb-4"
        color="primary"
        outline
        block
    >New Post</Button>
  );

  return (   
    <Container>
        <h1>Posts</h1>
        {auth.isAuthenticated ? button : null}
        <PostsList />
    </Container>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PostsPage);