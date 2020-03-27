import React, { Component } from 'react';
import axios from 'axios';
import './HelpeeForm.scss';

export default class HelperForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			req: {},
			name: '',
			phone: '',
			addr: '',
			error: ''
		};
	}
	componentWillMount() {
		const { req } = this.props.location.state;
		this.setState({ req: req });
	}

	handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ ...this.state, [name]: value });
	};

	handleSubmit = event => {
		this.setState({ error: '' });

		if (!this.state.addr || !this.state.name || !this.state.phone) {
			this.setState({
				error: 'Error: Field Empty: Please fill all Fields'
			});

			return;
		}
		if (this.state.phone.length != 10) {
			this.setState({
				error: 'Please enter a valid 10 digit phone number'
			});
			return;
		}
		var bodyFormData = new FormData();
		bodyFormData.set('name_helper', this.state.name);
		bodyFormData.set('address_helper', this.state.addr);
		bodyFormData.set('phone_helper', this.state.phone);
		// bodyFormData.set('content', this.state.helpeeRequest);
		axios({
			method: 'post',
			url: `http://localhost:5000/helper/${this.state.req.id}`,
			data: bodyFormData,
			headers: { 'Content-Type': 'multipart/form-data' }
		})
			.then(function(response) {
				//handle success
				console.log(response);
				window.location = '/helperSuccess';
			})
			.catch(function(response) {
				//handle error
				console.log(response);
			});
	};

	render() {
		const { req } = this.state;
		return (
			<div class='form-page'>
				{/* <h1>
					{' '}
					Register to Help {req.name} with {req.content} at{' '}
					{req.address_help}. Phone Number: {req.phone_help}
				</h1> */}
				<form>
					<div class='segment'>
						<h1>
							{' '}
							Register to Help {req.name_help} with {req.content}{' '}
							at {req.address_help}. Phone Number:{' '}
							{req.phone_help}
						</h1>
					</div>

					<label>
						<input
							type='text'
							placeholder='Name'
							value={this.state.helpeeName}
							name='name'
							onChange={this.handleChange}
						/>
					</label>
					<label>
						<textarea
							// type='password'
							type='text'
							placeholder='Address'
							value={this.state.helpeeAddr}
							name='addr'
							onChange={this.handleChange}
						/>
					</label>
					<label>
						<input
							// type='password'
							type='text'
							placeholder='Phone Number'
							value={this.state.helpeePhone}
							name='phone'
							onChange={this.handleChange}
						/>
					</label>
					<button
						class='red'
						type='button'
						onClick={this.handleSubmit}
					>
						Sign Up
					</button>
					{this.state.error && (
						<div class='card-container'>
							<h3 class='error'> {this.state.error}</h3>
						</div>
					)}
				</form>
			</div>
		);
	}
}
