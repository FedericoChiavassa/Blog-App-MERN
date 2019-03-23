import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Posts extends Component {
    render() {
        return(
            <ListGroup>
                <ListGroupItem>Post One</ListGroupItem>
                <ListGroupItem>Post Two</ListGroupItem>
            </ListGroup>
        )
    }
}


export default Posts;