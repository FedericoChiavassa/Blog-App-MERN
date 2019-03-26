import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import PropTypes from 'prop-types';

class PostsList extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
    }

    render() {
        const { posts } = this.props.post;
        return(
            <ListGroup>
                {posts.map(({_id, title}) => (
                    <ListGroupItem key={_id}>
                        <Button
                            className="mr-3"
                            color="danger"
                            size="sm"
                            onClick={this.onDeleteClick.bind(this, _id)}
                        >&times;</Button>
                        <Link to={`/posts/${_id}`}>{title}</Link>
                        <Button
                            tag={Link}
                            to={`/posts/${_id}/edit`}
                            className="float-right"
                            size="sm"
                            color="primary"
                        >Edit Post</Button>
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }
}

PostsList.propTypes = {
    getPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts, deletePost })(PostsList);