import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
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
        if(this.props.post.loading) return <Spinner style={{display: 'block'}} color="primary" />;
        const { posts } = this.props.post;
        const { isAuthenticated } = this.props.auth;

        if(posts.length < 1) {
            if(!isAuthenticated)
                return (<p>There are no posts yet. To create a new post you need to <Link to="/register">Register</Link> or <Link to="/login">Login</Link>.</p>);
            else
                return (<p>There are no posts yet.</p>);
        }

        return(
            <Fragment>
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
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPosts, deletePost })(PostsList);