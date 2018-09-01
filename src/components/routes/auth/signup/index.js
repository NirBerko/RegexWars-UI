import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../../../../services/user/action'

import Button from '../../../../ui/Button';

import './index.scss';

class Signup extends Component {
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

    }

    onSubmit(e) {
        e.preventDefault();

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
            <div className="SignupPage">
                <form onSubmit={this.onSubmit}>
                    <input type="email" name="email" placeholder="Email Address" onChange={this.onInputChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={this.onInputChange}/>
                    <input type="password" name="password" placeholder="Verify Password" onChange={this.onInputChange}/>
                    <Button disabled={buttonDisabled}>
                        {buttonDisabled ? 'Verifying...' : 'Sign Up'}
                    </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({userReducer}) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);