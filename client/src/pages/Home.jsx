// User.jsx
import React, { useState, createContext } from 'react';
import { UserLogin, UserRegister } from '../components';

// Load CSS
import '../assets/styles/home.scss';

export const AppContext = createContext();

export default () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<main className="content home">
			<AppContext.Provider value={{ isLogin, setIsLogin }}>
				{isLogin ? <UserLogin/> : <UserRegister/>}
			</AppContext.Provider>
		</main>
	);
}
