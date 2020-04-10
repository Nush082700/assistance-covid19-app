import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import { Icon, InlineIcon } from '@iconify/react';
import eyeIcon from '@iconify/icons-mdi/eye';

import './HelpeeForm.scss';

class SignUp extends Component {
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
		var hist = this.props.history;
		this.setState({ error: '' });
		if (
			!this.state.addr ||
			!this.state.name ||
			!this.state.email ||
			!this.state.pwd
		) {
			this.setState({
				error: 'Error: Field Empty: Please fill all Fields',
			});
			return;
		}
		if (!this.validateEmail(this.state.email)) {
			this.setState({
				error: 'Please enter a valid email',
			});
			return;
		}
		const address = this.state.addr;
		const { lat, lng } = await axios({
			method: 'get',
			url: 'https://maps.googleapis.com/maps/api/geocode/json',
			params: {
				address: address,
				key: 'AIzaSyAU1IoiFZRckN7r8gMpAcEXEPRw2Ml6CKc',
			},
		}).then((res) => {
			return res.data.results[0].geometry.location;
		});
		var bodyFormData = new FormData();
		bodyFormData.set('userName', this.state.name);
		bodyFormData.set('password', this.state.pwd);
		bodyFormData.set('email', this.state.email);
		bodyFormData.set('latitude', lat);
		bodyFormData.set('longitude', lng);
		this.props.signUp(bodyFormData);
	};

	render() {
		if (this.props.redirect) {
			return <Redirect to={this.props.redirect} />;
		}

		return (
			<div class='home-page'>
				<form>
					<div class='segment'>
						<h1>Sign up</h1>
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
						<textarea
							// type='password'
							type='text'
							placeholder='Address'
							value={this.state.addr}
							name='addr'
							onChange={this.handleChange}
						/>
					</label>
					<label>
						<input
							// type='password'
							type='text'
							placeholder='Email'
							value={this.state.email}
							name='email'
							onChange={this.handleChange}
						/>
					</label>
					<label>
						<input
							// type='password'
							type={'password'}
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
						Sign Up
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
	console.log(state);
	return {
		...state,
	};
}

export default connect(mapStateToProps, { ...actionCreators })(SignUp);
