import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Formik} from 'formik';

import {registerUser} from '../../../../services/user/action';

import {Button, Input} from '../../../../ui/FormUI';

import './index.scss';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.data = {};

        this.state = {
            isSubmitting: false,
            error: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validators = this.validators.bind(this);
    }

    componentDidMount() {
        this.props.changeTab();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userRegister.error) {
            this.setState({
                isSubmitting: false,
                error: nextProps.userRegister.error.response.data,
            })
        }
    }

    onSubmit(values) {
        this.props.registerUser(values.email, values.password);

        this.setState({
            error: null,
            isSubmitting: true,
        })
    }

    validators = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Please enter your email address";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Please enter a valid email address";
        }
        if (!values.password) {
            errors.password = "Please enter your password";
        }
        if (!values.verifyPassword) {
            errors.verifyPassword = "Please enter your password again";
        } else if (values.password !== values.verifyPassword) {
            errors.verifyPassword = "Passwords do not match.";
        }
        return errors;
    };

    render() {
        return (
            <div className="SignupPage">

                <Formik validate={values => this.validators(values)}
                        onSubmit={this.onSubmit}
                        isSubmitting={this.state.isSubmitting}
                        render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
                            <form onSubmit={handleSubmit}>

                                <Input type="email"
                                       name="email"
                                       autoComplete="off"
                                       placeholder="Email Address"
                                       onChange={(e) => {
                                           this.setState({error: null});
                                           handleChange(e);
                                       }}
                                       onBlur={handleBlur}
                                       error={(touched.email && errors.email) || (this.state.error && (this.state.error.errorCode === 101 && this.state.error.error))}
                                />

                                <Input type="password"
                                       name="password"
                                       placeholder="Password"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={touched.password && errors.password} />

                                <Input type="password"
                                       name="verifyPassword"
                                       placeholder="Verify Password"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={touched.verifyPassword && errors.verifyPassword} />

                                <Button type="submit" disabled={this.state.isSubmitting || Object.keys(errors).length}>
                                    {this.state.isSubmitting ? 'Verifying...' : 'Sign Up'}
                                </Button>
                            </form>
                        )}
                />
            </div>
        )
    }
}

const mapStateToProps = ({userReducer}) => ({
    userRegister: userReducer.userRegister
});

const mapDispatchToProps = (dispatch) => ({
    registerUser: (email, password) => dispatch(registerUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);