import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Spinner, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/postActions';
import { clearMessage } from '../actions/messageActions';
import PropTypes from 'prop-types';

class PostsList extends Component {

    state = {
        msg: ""
    }

    componentDidMount() {
        this.props.getPosts();
    }

    componentDidUpdate(prevProps) {
        const { message} = this.props;
        if(message !== prevProps.message) {
            if(message.msg) {
                this.setState({msg: message.msg});
            } else {
                this.setState({ msg: "" });
            }
        }
    }
    
    componentWillUnmount() {
        this.props.clearMessage();
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
    }

    render() {
        if(this.props.post.loading) return <Spinner style={{display: 'block'}} color="primary" />;
        const { posts } = this.props.post;
        return(
            <Fragment>
                { this.state.msg ? (<Alert className="mt-3 mb-3" color="success">{this.state.msg}</Alert>) : null}
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
    clearMessage: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    message: state.message
});

export default connect(mapStateToProps, { getPosts, deletePost, clearMessage })(PostsList);