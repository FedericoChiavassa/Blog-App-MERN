import React from 'react';
import { Container } from 'reactstrap';
import NewPostForm from '../NewPostForm';

function NewPostPage({history}) {
  return (     
        <Container>
            <NewPostForm history={history} />
        </Container>
  );
}

export default NewPostPage;