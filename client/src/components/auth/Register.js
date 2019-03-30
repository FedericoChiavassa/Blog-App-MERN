import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(isAuthenticated) this.props.history.push('/');
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg});
            } else {
                this.setState({ msg: null });
            }
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        }
        
        // Attempt to register
        this.props.register(newUser);
        // this.props.clearErrors();
    }

    render() {
        if(this.props.auth.isLoading) return <Spinner color="primary" />;
        return(
            <div>
                { this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input 
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            className="mb-3"
                            onChange={this.onChange}
                        />

                        <Label for="email">Email</Label>
                        <Input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="mb-3"
                            onChange={this.onChange}
                        />

                        <Label for="password">Password</Label>
                        <Input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="mb-3"
                            onChange={this.onChange}
                        />
                        <Button
                            color="dark"
                            style={{marginTop: '2rem'}}
                        >Register</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownParams) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth:state.auth,
    history: ownParams.history,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);