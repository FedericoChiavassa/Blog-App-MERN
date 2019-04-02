import React from 'react';
import { Container } from 'reactstrap';
import NewPostForm from '../NewPostForm';

function NewPostPage({history, location}) {
  return (     
        <Container>
            <NewPostForm history={history} location={location} />
        </Container>
  );
}

export default NewPostPage;