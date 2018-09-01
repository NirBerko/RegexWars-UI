import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../../../../services/user/action';

import {Button, Input} from '../../../../ui/FormUI';

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

    componentDidMount() {
        this.props.changeTab();
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            buttonDisabled:
            (nextProps.userLogin.isPending &&
            !nextProps.userLogin.error) || nextProps.userLogin.data !== null
        })
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
                    <Input type="email" name="email" autoComplete="off" placeholder="Email Address" onChange={this.onInputChange}/>
                    <Input type="password" name="password" placeholder="Password" onChange={this.onInputChange}/>
                    <Button disabled={buttonDisabled}>
                        {buttonDisabled ? 'Verifying...' : 'Log In'}
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