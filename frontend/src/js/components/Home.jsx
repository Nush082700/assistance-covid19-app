import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './HelpeeForm.scss';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gotResponse: [],
			needResponse: []
		};
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	componentDidMount() {
		axios({
			method: 'get',
			url: 'http://localhost:5000/requests/all'
		}).then(res => {
			// this.setState()
			let gotResponse = [];
			let needResponse = [];
			res.data.requests.forEach(req => {
				req.name_helper
					? gotResponse.push(req)
					: needResponse.push(req);
			});
			this.setState({
				gotResponse: gotResponse,
				needResponse: needResponse
			});
		});
	}

	render() {
		return (
			<div class='home-page'>
				<h1 class='header' type='h1'>
					{' '}
					Asistance Log
				</h1>
				<div class='card-container'>
					<Link to='/helpeeForm' style={{ textDecoration: 'none' }}>
						<button class='red'> Sign Up for Assistance</button>
					</Link>
				</div>
				<h2 class='need' type='h2'>
					{' '}
					Requests for Assistance
				</h2>
				<div class='card-container'>
					{this.state.needResponse.map(req => (
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
					{this.state.gotResponse.map(req => (
						<GotResponseCard req={req} key={req.id} />
					))}
				</div>
			</div>
		);
	}
}

const NeedResponseCard = props => {
	return (
		<Link
			to={{
				pathname: '/helperForm',
				state: {
					req: props.req
				}
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

const GotResponseCard = props => {
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
