import React from 'react';
import { Container } from 'reactstrap';
import Posts from '../Posts';

export default function PostsPage() {
  return (         
        <Container>
            <h1>Posts</h1>
            <Posts />
        </Container>
  );
}