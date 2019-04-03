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
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error} = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'LOGIN_FAIL') {
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

        const { email, password } = this.state;

        const user = {
            email,
            password
        };
        
        // Attempt to login
        this.props.login(user);
        this.props.clearErrors();
    }

    render() {
        if(this.props.auth.isLoading) return <Spinner color="primary" />;

        const { isAuthenticated} = this.props;
        if(isAuthenticated) {
            const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
            return <Redirect to={from} />
        }

        return(
            <div>
                { this.state.msg ? (<Alert className="mt-3 mb-3" color="danger">{this.state.msg}</Alert>) : null}
                <Form onSubmit={this.onSubmit} className="mt-3">
                    <FormGroup>
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
                            className="mt-3"
                        >Login</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth:state.auth,
    history: ownParams.history,
    location: ownParams.location
});

export default connect(mapStateToProps, { login, clearErrors })(Login);