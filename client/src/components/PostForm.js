import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getPost, addPost, updatePost, clearPostState } from '../actions/postActions';
import PropTypes from 'prop-types';

class PostForm extends Component {
    
    state = {
        title: "",
        body: "",
        newPost: true
    }

    componentDidMount() {
        if(this.props.id) {
            this.props.getPost(this.props.id);
            const { post } = this.props.post;
            this.setState({
                title: post.title,
                body: post.body,
                newPost: false
            })
        }
    }

    componentWillUnmount() {
        this.props.clearPostState();
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})
    
    submitPost = e => {
        e.preventDefault();
        const { title, body } = this.state;
        const post = { title, body };
        this.state.newPost ? this.props.addPost(post) : this.props.updatePost(this.props.id, post);
        this.setState({
            title: '',
            body: ''
          });
        this.props.history.push('/posts');
    }

    render() {
        if(this.props.post.loading) return "LOADING";
        
        const { title, body } = this.props.post.post;

        return(
            <Form onSubmit={this.submitPost}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input 
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        defaultValue={title}
                        placeholder="Title..." />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input 
                        type="textarea"
                        name="body"
                        id="body"
                        onChange={this.onChange}
                        defaultValue={body}
                        placeholder="Body..." 
                        rows="10"/>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" >Submit</Button>
                </FormGroup>
            </Form>
        )
    }
}

PostForm.propTypes = {
    getPost: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    clearPostState: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    id: PropTypes.string
}

const mapStateToProps = (state, ownParams) => ({
    post: state.post,
    history: ownParams.history,
    id: ownParams.id
});

export default connect(mapStateToProps, { getPost, addPost, updatePost, clearPostState })(PostForm);