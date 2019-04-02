import React from 'react';
import { Container } from 'reactstrap';
import UpdatePostForm from '../UpdatePostForm';

function EditPostPage({match, history, location}) {
  return (     
        <Container>
            <UpdatePostForm id={match.params.id} history={history} location={location} />
        </Container>
  );
}

export default EditPostPage;