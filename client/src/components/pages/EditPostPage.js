import React from 'react';
import { Container } from 'reactstrap';
import PostForm from '../PostForm';

function EditPostPage({match, history}) {
  return (     
        <Container>
            <PostForm id={match.params.id} history={history} />
        </Container>
  );
}

export default EditPostPage;