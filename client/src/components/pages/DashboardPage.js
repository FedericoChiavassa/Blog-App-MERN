import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import UserPosts from '../UserPosts';

function DashboardPage() {
  return (         
    <Container>
        <h1>Dashboard</h1>
        <Button
            tag={Link}
            to="/posts/create-post"
            className="mt-4 mb-4"
            color="primary"
            outline
            block
            >New Post</Button>
            <h3>Your Posts</h3>
        <UserPosts />
    </Container>
  );
}

export default DashboardPage;