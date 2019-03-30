import React from 'react';
import { Container } from 'reactstrap';
import PostForm from '../PostForm';

function NewPostPage({history}) {
  return (     
        <Container>
            <PostForm newPost={true} history={history} />
        </Container>
  );
}

export default NewPostPage;