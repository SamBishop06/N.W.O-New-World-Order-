// User.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';

import { settings } from '../config/settings';
// Load CSS
import '../assets/styles/whispers.scss';

/***
 TODO: Use some method to map the userId in messages to the user in users. Ideally, it should be replaced.
  This method below is just a placeholder for testing purposes
 */
// Load sample data
import { users, messages } from '../data/whisperSampleData.js';


export default () => {
	const handleSendMessage = message => {};

	return (
		<main className="whispers">
			<Helmet>
				<title>Whispers</title>
				<meta name="description" content="This is a place to have a discussion."/>
			</Helmet>
			<MessageList messages={messages}/>
			<ChatInput onSendMessage={handleSendMessage}/>
			<UserList users={users}/>
		</main>
	);
}

function MessageList() {
	return (
		<ul className="whispers__message-list message-list">
			{messages.map(message => <Message key={message.id}
			                                  {...message}
			                                  timestamp={format(new Date(message.timestamp), settings.timeFormat)}/>)}
		</ul>
	);
}

function Message({ user, message, timestamp }) {
	return (
		<li className="message-list__message message">
			<time className="message__timestamp">{timestamp}</time>
			<div className="message__username">{user.username}</div>
			<p className="message__content">{message}</p>
		</li>
	);
}

function ChatInput({ onSendMessage }) {
	const [inputText, setInputText] = useState('');

	const handleSubmit = (event) => {};

	return (
		<form className="whispers__chat-input chat-input" onSubmit={handleSubmit}>
			<textarea className="chat-input__field" value={inputText} onChange={e => setInputText(e.target.value)}/>
			<button className="button icon chat-input__send-button" type="submit">send</button>
		</form>
	);
}

function UserList({ users }) {
	return (
		<ul className="whispers__user-list user-list">
			{users.map(user => <User key={user.id} {...user} />)}
		</ul>
	);
}

function User({ username }) {
	return (
		<li className="user-list__user user">{username}</li>
	);
}
