import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import PostsList from '../PostsList';

function PostsPage() {
  return (         
        <Container>
            <h1>Posts</h1>
            <PostsList />
            <Button
                tag={Link}
                to="/posts/create-post"
                className="mt-4"
                color="primary"
            >New Post</Button>
        </Container>
  );
}

export default PostsPage;