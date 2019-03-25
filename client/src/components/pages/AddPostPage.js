import React from 'react';
import { Container } from 'reactstrap';
import AddPost from '../AddPost';

 export default function AddPostPage({history}) {
  return (     
        <Container>
            <AddPost history={history} />
        </Container>
  );
}