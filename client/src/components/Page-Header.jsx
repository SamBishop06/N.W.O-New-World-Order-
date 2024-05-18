import { Helmet } from 'react-helmet';
import { PageMenu, LanguageSwitcher } from '.';

export default function PageHeader() {
	return (
		<header className="page-header">
			<h1 className="page-header__item page-header__title">N.W.O</h1>
			<PageMenu/>
			<LanguageSwitcher/>
			<div className="page-header__item"></div>
		</header>
	);
}
