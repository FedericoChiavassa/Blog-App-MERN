import React from 'react';
import { Container } from 'reactstrap';
import Post from '../Post';

 export default function PostPage({ match }) {
  return (     
        <Container>
            <Post id={match.params.id}/>
        </Container>
  );
}
