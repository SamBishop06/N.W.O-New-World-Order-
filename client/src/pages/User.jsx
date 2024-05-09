import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { UserDashboard, UserLogin, UserRegister } from '../components';

// Load CSS
import '../assets/styles/user.scss';

export default () => {
	return (
		<main className="content user">
			<Routes>
				<Route path="login" element={<UserLogin/>}/>
				<Route path="register" element={<UserRegister/>}/>
				<Route path="dashboard" element={<UserDashboard />}/>
			</Routes>
		</main>
	);
}
