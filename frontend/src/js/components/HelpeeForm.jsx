import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './HelpeeForm.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
const base =
	process.env.REACT_APP_ENV == 'dev' ? 'http://localhost:5000/api' : '/api';

class RequireAssistanceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shortContent: '',
			content: '',
			error: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ ...this.state, [name]: value });
	};

	handleSubmit = (event) => {
		var hist = this.props.history;
		this.setState({ error: '' });

		if (!this.state.shortContent || !this.state.content) {
			this.setState({
				error: 'Error: Field Empty: Please fill all Fields',
			});

			return;
		}

		this.setState({ error: '' });
		var bodyFormData = new FormData();
		bodyFormData.set('content', this.state.content);
		bodyFormData.set('short_content', this.state.shortContent);
		bodyFormData.set('helpee_id', this.props.user);
		axios({
			method: 'post',
			baseURL: base,
			url: '/request/add',
			data: bodyFormData,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then(function (response) {
				//handle success
				console.log(response);
				hist.push('/helpeeSuccess');
			})
			.catch(function (response) {
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
							placeholder='Help me with..'
							value={this.state.shortContent}
							name='shortContent'
							onChange={this.handleChange}
						/>
					</label>
					<label>
						<textarea
							// type='password'
							type='text'
							placeholder='Detailed Request'
							value={this.state.content}
							name='content'
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

function mapStateToProps(state) {
	console.log(state);
	return {
		...state,
	};
}

export default connect(mapStateToProps, { ...actionCreators })(
	RequireAssistanceForm
);
