import React, { Component, Fragment } from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { clearMessage } from '../actions/messageActions';
import PropTypes from 'prop-types';

class PostsList extends Component {

    state = {
        msg: ""
    }

    componentDidUpdate(prevProps) {
        const { message} = this.props;
        if(message ) {
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

    render() {
        return(
            <Fragment>
                { this.state.msg ? (<Alert className="mt-3 mb-3" color="success">{this.state.msg}</Alert>) : null}
            </Fragment>
        )
    }
}

PostsList.propTypes = {
    clearMessage: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    message: state.message
});

export default connect(mapStateToProps, { clearMessage })(PostsList);