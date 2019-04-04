import React from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import PostsList from '../PostsList';

function PostsPage({ auth, match, post }) {
  const id = match.params.id;
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

  if((isNaN(id) && id) ||  id > post.totalPages) {
      return <Redirect to="/posts" />
  }

  return (   
    <Container>
        <h1 className="mb-4 d-inline-block">Posts</h1>
        {auth.isAuthenticated ? button : null}
        <PostsList page={id} />
    </Container>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps)(PostsPage);