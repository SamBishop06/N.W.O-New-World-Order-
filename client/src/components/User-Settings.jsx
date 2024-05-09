import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AppContext } from '../pages/Home';
// Load language translations
import { useTranslation } from 'react-i18next';
import '../config/i18n';

// Load CSS
import '../assets/styles/sections/settings.scss';

export default () => {
	const [error, setError] = useState('');
	const { t }             = useTranslation(); // For translations

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// TODO: Add Code Here
	};

	return (
		<>
			<Helmet>
				<title>{t('register.pageTitle')}</title>
				<meta name="description"
				      content="Create a new account on our site. Enter your personal information and secure your profile."/>
			</Helmet>

			<form className="form register-form" onSubmit={handleFormSubmit}>
				<header className="form__header">
					<h2 className="form__title">{t('register.formTitle')}</h2>
					<Link className="link form__link" onClick={() => setIsLogin(true)} to="#">
						{t('register.linkText')}
					</Link>
				</header>

				<div className="form__row register-form__row--name">
					<label className="form__label form__label--name" htmlFor="name">{t('register.name')}</label>
					<input className="form__input form__input--name" type="text" name="name" placeholder={t('register.name')}/>
				</div>

				<div className="form__row register-form__row--username">
					<label className="form__label form__label--username" htmlFor="username">{t('register.username')}</label>
					<input className="form__input form__input--username" type="text" name="username"
					       placeholder={t('register.username')}/>
				</div>

				<div className="form__row register-form__row--email">
					<label className="form__label form__label--email" htmlFor="email">{t('register.email')}</label>
					<input className="form__input form__input--email" type="email" name="email" placeholder={t('register.email')}/>
				</div>

				<div className="form__row register-form__row--password">
					<label className="form__label form__label--password" htmlFor="password">{t('register.password')}</label>
					<input className="form__input form__input--password" type="password" name="password"
					       placeholder={t('register.password')}/>
				</div>

				<div className="form__row register-form__row--confirm">
					<label className="form__label form__label--confirm-password"
					       htmlFor="confirmpassword">{t('register.passConfirm')}</label>
					<input className="form__input form__input--confirm-password" type="password" name="confirmpassword"
					       placeholder={t('register.passConfirm')}/>
				</div>

				<div className="form__row register-form__row--accept-terms">
					<input className="form__input form__input--checkbox" type="checkbox" name="coppa" id="coppa"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="coppa">{t('register.coppa')}</label>
				</div>

				<div className="form__row register-form__row--accept-terms">
					<input className="form__input form__input--checkbox" type="checkbox" name="terms" id="terms"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="terms">{t('register.terms')}</label>
				</div>

				<div className="form__row register-form__row--submit">
					<button className="form__button form__button--submit" type="submit">{t('register.button')}</button>
				</div>

				<div className="form__message form__message--error">{error}</div>
			</form>
		</>
	);
}
