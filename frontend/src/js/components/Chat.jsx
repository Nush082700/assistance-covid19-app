import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import './HelpeeForm.scss';
const base =
    process.env.REACT_APP_ENV == 'dev' ? 'http://localhost:5000/api' : '/api';
    
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            req: {}, 
            receiver: null,
            chat: '',
            notifications:'',
            message_hist_all: {},
            message_hist_curr:{},
            error: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentWillMount() {
		const { req } = this.props.location.state;
		await this.setState({ req: req });
		const message_hist_all = await axios({
			method: 'get',
			baseURL: base,
			url: `/allmessages/${this.props.user}`,
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.error(err);
				return null;
			});
		console.log(message_hist_all);
		this.setState({ message_hist_all: message_hist_all });
	}

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ ...this.state, [name]: value });
    };

    handleSubmit = (event) => {
        var hist = this.props.history;
        this.setState({ error: '' });

        if (!this.state.receiver || !this.state.chat) {
            this.setState({
                error: 'Error: Field Empty: Please fill all Fields',
            });

            return;
        }

        this.setState({ error: '' });
        var bodyFormData = new FormData();
        bodyFormData.set('sender', this.props.user);
        bodyFormData.set('receiver', this.state.receiver.id);
        bodyFormData.set('chat', this.state.chat);
        axios({
            method: 'post',
            baseURL: base,
            url: `/send_message/`,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                //hist.push('/helpeeSuccess');
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
                        <h1>Chat here</h1>
                    </div>
                    <li></li>
                    <label>
                        <input
                            type='text'
                            placeholder='Receiver'
                            value={this.state.receiver}
                            name='receiver'
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        <textarea
                            type='text'
                            placeholder='Message'
                            value={this.state.chat}
                            name='chat'
                            onChange={this.handleChange}
                        />
                    </label>

                    <button
                        class='red'
                        type='button'
                        onClick={this.handleSubmit}
                    >
                        Send
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

export default connect(mapStateToProps, { ...actionCreators })(Chat);
