import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addPost, clearPostState } from '../../actions/postActions';
import PropTypes from 'prop-types';

class NewPostForm extends Component {
    
    state = {
        title: "",
        body: ""
    }

    componentWillUnmount() {
        this.props.clearPostState();
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})
    
    submitPost = e => {
        e.preventDefault();
        const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
        const { title, body } = this.state;
        const post = { title, body };
        this.props.addPost(post);
        this.setState({
            title: '',
            body: ''
          });
        this.props.history.push(from);
    }

    render() {
        return(
            <Form onSubmit={this.submitPost}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input 
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={this.state.title}
                        placeholder="Title..." />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input 
                        type="textarea"
                        name="body"
                        id="body"
                        onChange={this.onChange}
                        value={this.state.body}
                        placeholder="Body..." 
                        rows="10"/>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" >Create Post</Button>
                </FormGroup>
            </Form>
        )
    }
}

NewPostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    clearPostState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    history: ownParams.history,
    location: ownParams.location
});

export default connect(mapStateToProps, { addPost, clearPostState })(NewPostForm);