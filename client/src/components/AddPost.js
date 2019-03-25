import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addPost } from '../actions/postActions';
import PropTypes from 'prop-types';

class AddPost extends Component {

    state = {
        title: '',
        body: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    
    submitPost = e => {
        e.preventDefault();
        const { title, body } = this.state;
        const post = { title, body };
        this.props.addPost(post);
        this.setState({
            title: '',
            body: ''
          });
        this.props.history.push('/posts');
    }

    render() {
        const { title, body } = this.state
        return(
            <Form onSubmit={this.submitPost}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input 
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={title}
                        placeholder="Title..." />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input 
                        type="textarea"
                        name="body"
                        id="body"
                        onChange={this.onChange}
                        value={body}
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

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    history: ownParams.history
});

export default connect(mapStateToProps, { addPost })(AddPost);