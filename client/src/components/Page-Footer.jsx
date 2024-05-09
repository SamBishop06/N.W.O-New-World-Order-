import { NavLink } from 'react-router-dom';
// Load language translations
import { useTranslation } from 'react-i18next';
import '../config/i18n';

export default function PageFooter() {
	const { t } = useTranslation(); // For translations
	return (
		<footer className="page-footer">
			<nav className="page-footer__nav">
				<ul className="page-footer__list">
					<li className="page-footer__item">
						<NavLink to="/privacy-policy" className="link page-footer__link">
							{t('page.footer.links.privacy')}
						</NavLink>
					</li>
					<li className="page-footer__item">
						<NavLink to="/terms-of-service" className="link page-footer__link">
							{t('page.footer.links.tos')}
						</NavLink>
					</li>
				</ul>
			</nav>
			<p className="page-footer__text">
				{t('page.footer.authors')}
			</p>
		</footer>
	);
};
