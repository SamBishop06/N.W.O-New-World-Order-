import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AppContext } from '../pages/Home';
// Load language translations
import { useTranslation } from 'react-i18next';
import '../config/i18n';

// Load CSS
import '../assets/styles/sections/loginregister.scss';

export default () => {
	const { setIsLogin }          = useContext(AppContext);
	const { t }                   = useTranslation(); // For translations
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError]       = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// TODO: Add Code Here
	};

	return (
		<>
			<Helmet>
				<title>{t('login.page.title')}</title>
				<meta name="description"
				      content={t('login.page.description')}/>
			</Helmet>

			<form className="form login-form" onSubmit={handleFormSubmit}>
				<header className="form__header">
					<h2 className="form__title">{t('login.formTitle')}</h2>
					<Link className="link form__link" onClick={() => setIsLogin(false)}
					      to="#">{t('login.linkText')}</Link>
				</header>
				<div className="form__row">
					<label className="form__label form__label--username"
					       htmlFor="username">{t('login.username')}</label>
					<input className="form__input form__input--username" type="text" name="username"
					       placeholder={t('login.username')}/>
				</div>
				<div className="form__row">
					<label className="form__label form__label--password"
					       htmlFor="password">{t('login.password')}</label>
					<input className="form__input form__input--password" type="password" name="password"
					       placeholder={t('login.password')}/>
				</div>
				<div className="form__row login-form__row--checkbox">
					<input className="form__input form__input--checkbox" type="checkbox" name="checkbox" id="checkbox"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="checkbox">{t('login.checkbox')}</label>
					<button className="form__button form__button--submit" type="submit">{t('login.button')}</button>
				</div>
				<div className="form__message form__message--error">{error}</div>
			</form>
		</>
	);
}
