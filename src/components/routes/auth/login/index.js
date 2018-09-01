import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../../../../services/user/action'

import Button from '../../../../ui/Button';

import './index.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.data = {};

        this.state = {
            buttonDisabled: false,
            loader: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            buttonDisabled:
            nextProps.userLogin.isPending &&
            !nextProps.userLogin.error || nextProps.userLogin.data !== null
        })
        /*if (!this.state.loader) {
            this.setState({
                loader: nextProps.userLogin.isPending
            })
        }*/
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.loginUser(this.data.email, this.data.password);

        this.setState({
            buttonDisabled: true,
        })
    }

    onInputChange(e) {
        this.data[e.target.name] = e.target.value;
    }

    render() {
        const {buttonDisabled} = this.state;

        return (
            <div className="LoginPage">
                <form onSubmit={this.onSubmit}>
                    <input type="email" name="email" placeholder="Email Address" onChange={this.onInputChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={this.onInputChange}/>
                    <Button disabled={buttonDisabled}>
                        {buttonDisabled ? 'Verifying...' : 'Login'}
                    </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({userReducer}) => ({
    userLogin: userReducer.userLogin,
});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);