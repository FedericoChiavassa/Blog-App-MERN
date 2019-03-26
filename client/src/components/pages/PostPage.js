import React from 'react';
import { Container } from 'reactstrap';
import PostDetails from '../PostDetails';

 export default function PostPage({ match }) {
  return (     
        <Container>
            <PostDetails id={match.params.id}/>
        </Container>
  );
}
