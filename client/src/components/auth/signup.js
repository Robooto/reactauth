import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

    handleFormSubmit({email, password, passwordConfirm}) {
        console.log(email, password, passwordConfirm);
        // need to do something to log user in
    }

    render() {
        console.log(this.props);
        const { handleSubmit, error, props} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field component={renderField} type="text" name="email" label="Email"/>
				<Field component={renderField} type="password" name="password" label="Password"/>
                <Field component={renderField} type="password" name="passwordConfirm" label="Confirm Password"/>
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if(!values.email) {
        errors.email = 'Please enter an email';
    }

    if (!values.password) {
        errors.password = 'Please enter a password';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords must match';
        errors.passwordConfirm = ' ';
    }

    return errors;
};

const renderField = ({ input, label, type, meta: { touched, error , invalid} }) => {
	//Construct form-group class depending on form state
	const groupClass = touched ? (invalid ? 'form-group has-danger':'form-group has-success') : 'form-group';
	//Construct form-control class depending on form state
	const inputClass = touched ? (invalid ? 'form-control form-control-danger':'form-control form-control-success') : 'form-control';
	
	return (
		<div className={groupClass}>
			<label>{label}</label>
			<input {...input} placeholder={label} type={type} className={inputClass} />
			<div className="form-control-feedback">
				{touched && error && <span>{error}</span>}
			</div>
		</div>
	)
}

Signup = reduxForm({
    form: 'signup',
    validate
})(Signup);

export default Signup;