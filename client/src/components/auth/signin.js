import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({email, password}) {
        console.log(email, password);
        // need to do something to log user in
        this.props.signinUser({email, password});
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    
    render() {
        const { handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field component={renderField} type="text" name="email" label="Email"/>
				<Field component={renderField} type="password" name="password" label="Password"/>
                <Field component={renderField} type="hidden" name="global" />
                {this.renderAlert()}
                <div>
                    <Field component={renderError} type="text" name="email" label="Email"/>
				    <Field component={renderError} type="password" name="password" label="Password"/>
                    <Field component={renderError} type="password" name="global" />
                </div>
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

const renderError = ({input, meta, ...props}) => (
    <span {...props} className='error'>{meta.invalid && meta.touched && meta.error}</span>
)


const validate = values => {
	const errors = {}
	
	//Check email value for empty
	if (!values.email || !values.password) {
		errors.global = 'Please complete the required fields.';
	}

	//Check password value for empty
	if (!values.password) {
		errors.password = 'Please enter an password';
	}

    if (!values.email) {
		errors.email = 'Please enter a email.'
	}
	
	return errors
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
		</div>
	)
};

Signin = reduxForm({
    form: 'signin',
    validate
})(Signin);

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

Signin = connect(mapStateToProps, actions)(Signin);

export default Signin