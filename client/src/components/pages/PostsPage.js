import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Posts from '../Posts';

export default function PostsPage() {
  return (         
        <Container>
            <h1>Posts</h1>
            <Posts />
            <Button
                tag={Link}
                to="/posts/create-post"
                className="mt-3"
                color="primary"
            >New Post</Button>
        </Container>
  );
}