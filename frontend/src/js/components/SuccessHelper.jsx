import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SuccessHelper extends Component {
	render() {
		return (
			<div class='home-page'>
				<h1>
					Thanks for assisting some one! Please contact them soon!
				</h1>
				<Link to=''>
					<button>Home</button>
				</Link>
			</div>
		);
	}
}
