import React from 'react';
import { Container } from 'reactstrap';
import UpdatePostForm from '../UpdatePostForm';

function EditPostPage({match, history}) {
  return (     
        <Container>
            <UpdatePostForm id={match.params.id} history={history} />
        </Container>
  );
}

export default EditPostPage;