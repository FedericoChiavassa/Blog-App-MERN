import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import Message from './Message';
import PropTypes from 'prop-types';

class PostsList extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
    }

    render() {
        if(this.props.post.loading) return <Spinner style={{display: 'block'}} color="primary" />;
        const { posts } = this.props.post;
        return(
            <Fragment>
                <Message />
                <ListGroup>
                    {posts.map(({_id, title}) => (
                        <ListGroupItem key={_id}>
                            <Link to={{
                                pathname: `/posts/${_id}`,
                                state: { from: '/posts' }
                            }}>{title}</Link>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Fragment>
        )
    }
}

PostsList.propTypes = {
    getPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts, deletePost })(PostsList);