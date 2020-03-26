import React, { Component } from 'react';
import axios from 'axios';
import './HelpeeForm.scss';

class RequireAssistanceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			helpeeName: '',
			helpeeAddr: '',
			helpeePhone: '',
			helpeeRequest: '',
			error: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// console.log(this.context);
	}

	handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ ...this.state, [name]: value });
	};

	handleSubmit = event => {
		this.setState({ error: '' });

		if (
			!this.state.helpeeAddr ||
			!this.state.helpeeName ||
			!this.state.helpeePhone ||
			!this.state.helpeeRequest
		) {
			this.setState({
				error: 'Error: Field Empty: Please fill all Fields'
			});

			return;
		}
		if (this.state.helpeePhone.length != 10) {
			this.setState({
				error: 'Please enter a valid 10 digit phone number'
			});
			return;
		}
		// for (let i = 0; i != 10; i++) {
		// 	if (
		// 		!(
		// 			this.state.helpeePhone[i] > 31 &&
		// 			(this.state.helpeePhone[i] < 48 ||
		// 				this.state.helpeePhone[i] > 57)
		// 		)
		// 	)
		// 		this.setState({
		// 			error: 'Please enter a valid 10 digit phone number'
		// 		});
		// 	console.log(i);

		// 	return;
		// }
		this.setState({ error: '' });
		console.log('here');
		var bodyFormData = new FormData();
		bodyFormData.set('name_helpee', this.state.helpeeName);
		bodyFormData.set('address_helpee', this.state.helpeeAddr);
		bodyFormData.set('phone_helpee', this.state.helpeePhone);
		bodyFormData.set('content', this.state.helpeeRequest);
		axios({
			method: 'post',
			url: 'http://localhost:5000/',
			data: bodyFormData,
			headers: { 'Content-Type': 'multipart/form-data' }
		})
			.then(function(response) {
				//handle success
				console.log(response);
				// this.props.history.push('/');
				// window.location = '/';
				window.location = '/helpeeSuccess';
			})
			.catch(function(response) {
				//handle error
				console.log(response);
			});
	};

	render() {
		return (
			<div class='home-page'>
				<form>
					<div class='segment'>
						<h1>Sign up to request Assistance</h1>
					</div>
					<label>
						<input
							type='text'
							placeholder='Name'
							value={this.state.helpeeName}
							name='helpeeName'
							onChange={this.handleChange}
						/>
					</label>
					<label>
						<textarea
							// type='password'
							type='text'
							placeholder='Address'
							value={this.state.helpeeAddr}
							name='helpeeAddr'
							onChange={this.handleChange}
						/>
					</label>
					<label>
						<input
							// type='password'
							type='text'
							placeholder='Phone Number'
							value={this.state.helpeePhone}
							name='helpeePhone'
							onChange={this.handleChange}
						/>
					</label>
					<label>
						<textarea
							// type='password'
							placeholder='You need help with ...'
							value={this.state.helpeeRequest}
							name='helpeeRequest'
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

					{/* <div class='segment'>
						<button class='unit' type='button'>
							<i class='icon ion-md-arrow-back'></i>
						</button>
						<button class='unit' type='button'>
							<i class='icon ion-md-bookmark'></i>
						</button>
						<button class='unit' type='button'>
							<i class='icon ion-md-settings'></i>
						</button>
					</div> */}

					{/* <div class='input-group'>
						<label>
							<input type='text' placeholder='Email Address' />
						</label>
						<button class='unit' type='button'>
							<i class='icon ion-md-search'></i>
						</button>
					</div> */}
				</form>
			</div>
		);
	}
}

export default RequireAssistanceForm;