import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../../../../services/user/action'

import './index.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.data = {};

        this.state = {
            buttonDisabled: true,
            loader: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validator = this.validator.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (!this.state.loader) {
            this.setState({
                loader: nextProps.userLogin.isPending
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.loginUser(this.data.email, this.data.password);
    }

    validator() {
        this.setState({
            buttonDisabled: !this.data.email || !this.data.password
        })
    }

    onInputChange(e) {
        this.data[e.target.name] = e.target.value;

        this.validator();
    }

    render() {
        return (
            <div className="LoginPage">
                <form onSubmit={this.onSubmit}>
                    <input type="email" name="email" placeholder="Email address" onChange={this.onInputChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={this.onInputChange}/>
                    <button disabled={this.state.buttonDisabled}>Login</button>
                    <div className="LoginPage__loaderImg">
                        {this.state.loader && <span>loading</span>}
                    </div>
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