import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './HelpeeForm.scss';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gotResponse: [],
			needResponse: [],
			pin: '',
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		if (!this.state.pin) {
			console.log('woohoo');
			axios({
				method: 'get',
				url: '/requests/all',
			}).then((res) => {
				// this.setState()
				let gotResponse = [];
				let needResponse = [];
				res.data.requests.forEach((req) => {
					req.name_helper
						? gotResponse.push(req)
						: needResponse.push(req);
				});
				this.setState({
					gotResponse: gotResponse,
					needResponse: needResponse,
				});
			});
		} else {
			let pin = this.state.pin;
			axios({
				method: 'get',
				url: '/pins/' + pin,
			}).then((res) => {
				// this.setState()
				let gotResponse = [];
				let needResponse = [];
				res.data.requests.forEach((req) => {
					req.name_helper
						? gotResponse.push(req)
						: needResponse.push(req);
				});
				this.setState({
					gotResponse: gotResponse,
					needResponse: needResponse,
				});
			});
		}
	}

	handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ ...this.state, [name]: value });
		if (value.length === 6) {
			let pin = this.state.pin;
			axios({
				method: 'get',
				url: '/pins/' + value,
			}).then((res) => {
				// this.setState()
				console.log(res);
				let gotResponse = [];
				let needResponse = [];
				res.data.requests.forEach((req) => {
					req.name_helper
						? gotResponse.push(req)
						: needResponse.push(req);
				});
				this.setState({
					gotResponse: gotResponse,
					needResponse: needResponse,
				});
			});
		}
		if (value.length === 0) {
			let pin = this.state.pin;
			axios({
				method: 'get',
				url: '/requests/all',
			}).then((res) => {
				// this.setState()
				let gotResponse = [];
				let needResponse = [];
				res.data.requests.forEach((req) => {
					req.name_helper
						? gotResponse.push(req)
						: needResponse.push(req);
				});
				this.setState({
					gotResponse: gotResponse,
					needResponse: needResponse,
				});
			});
		}
	};

	onFormSubmit = (event) => {};

	render() {
		console.log('Hi this is a test');
		return (
			<div class='home-page'>
				<h1 class='header' type='h1'>
					{' '}
					Assistance Log
				</h1>
				{/* <form> */}
				<label style={{ width: 300, padding: 10 }}>
					<input
						type='text'
						placeholder='Enter your pin code to filter requests'
						value={this.state.pin}
						name='pin'
						onChange={this.handleChange}
					/>
				</label>
				{/* <input type='submit' /> */}
				{/* </form> */}
				<div class='card-container' style={{ flexGrow: 1 }}>
					<Link to='/signUp' style={{ textDecoration: 'none' }}>
						<button class='red'>
							<h2>Sign Up</h2>{' '}
						</button>
					</Link>
				</div>
				<h2 class='need' type='h2'>
					{' '}
					Requests for Assistance
				</h2>

				<div class='card-container'>
					{this.state.needResponse.length === 0 && (
						<h3>
							{this.state.pin
								? 'None for this pin'
								: 'No Requests Registerd'}
						</h3>
					)}
					{this.state.needResponse.map((req) => (
						<NeedResponseCard req={req} key={req.id} />
					))}
				</div>
				{/* Need res */}
				<br />
				{/* {this.state.gotResponse.length} Need res */}
				<h2 class='got' type='h2'>
					{' '}
					Assistance provided
				</h2>

				<div class='card-container'>
					{this.state.gotResponse.length === 0 && (
						<h3>
							{this.state.pin
								? 'None for this pin'
								: 'No Requests Answered'}
						</h3>
					)}
					{this.state.gotResponse.map((req) => (
						<GotResponseCard req={req} key={req.id} />
					))}
				</div>
			</div>
		);
	}
}

const NeedResponseCard = (props) => {
	return (
		<Link
			to={{
				pathname: '/helperForm',
				state: {
					req: props.req,
				},
			}}
			style={{ textDecoration: 'none' }}
		>
			<button class='card-need' type='button'>
				<h3>
					{' '}
					Help with <b>{props.req.content}</b> at{' '}
					{props.req.address_help}
				</h3>
			</button>
		</Link>
	);
};

const GotResponseCard = (props) => {
	return (
		// <Link to={{ pathname: '/helpeeForm' }}>
		<button class='card-got' type='button'>
			<h3>
				{' '}
				{props.req.name_helper} helped <b>{props.req.name_help}</b> with{' '}
				<b>{props.req.content}</b> at {props.req.address_help}
			</h3>
		</button>
		// </Link>
	);
};
