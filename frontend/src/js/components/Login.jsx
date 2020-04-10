import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import { Icon, InlineIcon } from '@iconify/react';
import eyeIcon from '@iconify/icons-mdi/eye';

import './HelpeeForm.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			addr: '',
			phone: '',
			pwd: '',
			error: '',
			pwdVisible: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ ...this.state, [name]: value });
	};

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	handleSubmit = async (event) => {
		this.setState({ error: '' });
		if (!this.state.name || !this.state.pwd) {
			this.setState({
				error: 'Error: Field Empty: Please fill all Fields',
			});
			return;
		}

		var bodyFormData = new FormData();
		bodyFormData.set('userName', this.state.name);
		bodyFormData.set('password', this.state.pwd);
		this.props.login(bodyFormData);
	};

	render() {
		if (this.props.redirect) {
			return <Redirect to={this.props.redirect} />;
		}
		return (
			<div class='home-page'>
				<form>
					<div class='segment'>
						<h1>Login</h1>
					</div>
					<label>
						<input
							type='text'
							placeholder='UserName'
							value={this.state.name}
							name='name'
							onChange={this.handleChange}
						/>
					</label>

					<label>
						<input
							// type='password'
							type='password'
							placeholder='Password'
							value={this.state.pwd}
							name='pwd'
							onChange={this.handleChange}
						/>
					</label>
					{/* <label>
                        <input
                            // type='password'
                            type="nubers"
                            placeholder="Pin Code"
                            value={this.state.pin}
                            name="pin"
                            onChange={this.handleChange}
                        />
                    </label> */}
					{/* <label>
                        <textarea
                            // type='password'
                            placeholder="You need help with ..."
                            value={this.state.helpeeRequest}
                            name="helpeeRequest"
                            onChange={this.handleChange}
                        />
                    </label> */}
					<button
						class='red'
						type='button'
						onClick={this.handleSubmit}
					>
						Log in
					</button>
					<button
						class='red'
						type='button'
						onClick={this.handleSubmit}
						style={{ marginTop: 20 }}
					>
						Dont have an account?
					</button>
					{(this.state.error || this.props.error) && (
						<div class='card-container'>
							<h3 class='error'>
								{' '}
								{this.state.error || this.props.error}
							</h3>
						</div>
					)}
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		...state,
	};
}

export default connect(mapStateToProps, { ...actionCreators })(Login);
